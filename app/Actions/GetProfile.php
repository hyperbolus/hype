<?php

namespace App\Actions;

use App\Models\GeometryDash\Profile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class GetProfile
{
    public static function byName($name)
    {
        // TODO: Put this stuff back and shove it in Hydrate helper
        $local = Profile::whereRaw('LOWER(`name`) LIKE ? ', ['%'.trim(strtolower($name)).'%'])->first();
        if(is_null($local) || $local->updated_at->diffInHours(Carbon::now()) > 2) {
            $res = Http::get('https://gdbrowser.com/api/profile/' . $name);
            if ($res->body() == '-1') {
                abort(404);
            }
            $profile = json_decode($res, true);
            if(is_null($local)) {
                $local = new Profile();
            }
            $local->name = $name;
            $local->user_id = $profile['playerID'];
            $local->account_id = $profile['accountID'];
            $local->stars = $profile['stars'];
            $local->diamonds = $profile['diamonds'];
            $local->coins_secret = $profile['coins'];
            $local->coins_user = $profile['userCoins'];
            $local->demons = $profile['demons'];
            $local->creator_points = $profile['cp'];
            $local->save();
        }
        return $local;
    }
}
