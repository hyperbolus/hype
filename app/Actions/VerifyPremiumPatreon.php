<?php

namespace App\Actions;

use App\Enums\OAuthPlatform;
use App\Models\LinkedAccount;
use App\Models\System\User;
use Exception;
use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class VerifyPremiumPatreon
{
    const string API = 'https://patreon.com/api/oauth2/';
    const string APIv2 = 'https://patreon.com/api/oauth2/v2/';

    public static function getAccount(int $user_id): ?LinkedAccount
    {
        $account = LinkedAccount::query()
            ->where('user_id', $user_id)
            ->where('platform', OAuthPlatform::Patreon)
            ->first();

        // Account not linked, cancels premium as you MUST have your account linked. To one at a time.
        if (!$account) return null;

        // check if token expired. if so grab a new one
        if ($account->expires_at->subHour() < Carbon::now()) {
            // Attempt to refresh
            if (!static::refresh($account)) {
                // If fails unlink
                $account->delete();
                return null;
            }
        }

        return $account;
    }

    public static function check(User $user): bool
    {
        $account = static::getAccount($user->id);

        if (!$account) return static::clear($user);

        $client = static::getAccount(0); // Thanks a lot Patreon OAuth-only API

        if (!$client) {
            // System account has no Patreon linked. Causes issues. Fuck it all.

            // Send gentle reminder every few mins
            cacheOr(
                'system::patreon::no-system-linked',
                function () {
                    discohook('<@902261587166003251> System account needs to link to Patreon!')->send();
                    return now();
                },
                now()->addMinutes(10)
            );

            return static::clear($user);
        }

        $includes = [];

        $res = static::request($account->token, 'identity', [
            'memberships',
            'memberships.campaign',
            'memberships.currently_entitled_tiers'
        ])->json();

        foreach ($res['included'] as $inc) {
            $type = $inc['type'];
            $id = $inc['id'];

            if (!array_key_exists($type, $includes)) $includes[$type] = [];

            $includes[$type][$id] = $inc['attributes'];

            if (array_key_exists('relationships', $inc)) {
                foreach ($inc['relationships'] as $key => $v) {
                    if ($key === 'campaign') $includes[$type][$id][$key . '_id'] = $v['data']['id'];
                    if ($key === 'currently_entitled_tiers') {
                        $includes[$type][$id]['entitled_tiers'] = array_map(fn($v) => $v['id'], $v['data']);
                    }
                }
            }
        }

        $membership_id = null;

        foreach ($includes['member'] as $id => $membership) {
            if ($membership['campaign_id'] === config('services.patreon.campaign_id') && in_array(config('services.patreon.tier_id'), $membership['entitled_tiers'])) {
                $membership_id = $id;
                break;
            }
        }

        // Could not find a membership for the right campaign in the right tier
        if ($membership_id === null) return static::clear($user);

        $res = static::request($client->token, 'members/' . $membership_id, fields: [
            'member' => [
                'campaign_lifetime_support_cents',
                'last_charge_date',
                'last_charge_status',
                'next_charge_date',
                'pledge_relationship_start'
            ],
        ]);

        // When this gets checked we should be in a grace period, hopefully enough time for payment to go through?
        if ($res->json('data.attributes.last_charge_status') === 'Paid') {
            $user->premium_started_at = $res->json('data.attributes.pledge_relationship_start');
            $user->premium_expires_at = Carbon::parse($res->json('data.attributes.next_charge_date'))->addDay(); // grace period
            $user->save();
        } else {
            return static::clear($user);
        }

        return true;
    }

    protected static function clear(User $user): false
    {
        $user->premium_started_at = null;
        $user->premium_expires_at = null;
        $user->save();

        return false;
    }

    protected static function request(string $token, string $endpoint, array|string $includes = [], array $fields = []): PromiseInterface|Response
    {
        try {
            $q = [];

            foreach ($fields as $k => $data) $q["fields[{$k}]"] = is_array($data) ? join(',', $data) : $data;

            return Http::withHeader('Authorization', 'Bearer ' . $token)
                ->get(static::APIv2 . $endpoint . '?' . http_build_query([
                        'include' => is_array($includes) ? join(',', $includes) : $includes,
                        ...$q,
                    ]));
        } catch (ConnectionException $e) {
            abort(500, 'Could not connect to Patreon API. Please inform an admin.');
        }
    }

    protected static function refresh(LinkedAccount $account): bool
    {
        if ($account->platform !== OAuthPlatform::Patreon->value) return false;

        try {
            $res = Http::post(static::API . 'token?' . http_build_query([
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $account->refresh_token,
                    'client_id' => config('services.patreon.client_id'),
                    'client_secret' => config('services.patreon.client_secret'),
                ]));

            if ($res->getStatusCode() === 200) {
                $account->token = $res->json('access_token');
                $account->refresh_token = $res->json('refresh_token');
                $account->expires_at = Carbon::now()->addSeconds($res->json('expires_in'));

                $account->save();

                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return false;
        }
    }
}
