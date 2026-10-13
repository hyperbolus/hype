<?php

namespace App\Http\Controllers\Dashboards\User;

use App\Hype;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rule;

class ProfileInformationController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = $request->user();

        if ($request->filled('custom_title')) {
            $user->custom_title = $user->isPremium() ? $request->string('custom_title') : null;
            $user->save();
        }

        $user->update($request->validate([
            'pronouns' => ['string', 'max:32', 'nullable'],
            'pronouns_visibility' => ['integer', Rule::in([0, 1])],

            'flag' => [Rule::in(array_merge(...Hype::$flags)), 'nullable'],

            'location' => ['string', 'max:32', 'nullable'],
            'location_visibility' => ['integer', Rule::in([0, 1])],

            'birthday' => ['date', 'nullable'],
            'birthday_visibility' => ['integer', Rule::in([0, 1])],

            'bio' => ['string', 'max:4000', 'nullable'],

            'signature' => ['string', 'max:200', 'nullable'],
            'signature_visibility' => ['integer', Rule::in([0, 1])],
        ]));

        return redirect()->route('settings.profile');
    }

    public function cosmetics(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = $request->user();

        $cosmetics = $user->cosmetics ?? [];

        if ($request->boolean('name_enabled')) {
            $cosmetics['name_color'] = [
                'slot' => 'name_color',
                'value' => $request->string('name'),
                'premium' => true,
            ];
        } else if (array_key_exists('name_color', $cosmetics)) {
            unset($cosmetics['name_color']);
        }

        if ($request->boolean('glow_enabled')) {
            $cosmetics['glow_color'] = [
                'slot' => 'glow_color',
                'value' => $request->string('glow'),
                'premium' => true,
            ];
        } else if (array_key_exists('glow_color', $cosmetics)) {
            unset($cosmetics['glow_color']);
        }

        if ($request->boolean('sparkle_enabled')) {
            $cosmetics['sparkle_color'] = [
                'slot' => 'sparkle_color',
                'value' => $request->string('sparkle'),
                'classes' => 'cosmetic-sparkle',
                'premium' => true,
            ];
        } else if (array_key_exists('sparkle_color', $cosmetics)) {
            unset($cosmetics['sparkle_color']);
        }

        $user->setAttribute('cosmetics', $cosmetics);

        return redirect()->route('settings.profile');
    }
}
