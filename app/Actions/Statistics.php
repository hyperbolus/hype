<?php

namespace App\Actions;

use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class Statistics
{
    public static function all(): array
    {
        return [
            'users' => self::count(\App\Models\System\User::class),
            'threads' => self::count(\App\Models\Content\Thread::class),
            'posts' => self::count(\App\Models\Content\Post::class),
            'levels' => self::count(\App\Models\Game\Level::class),
            'reviews' => self::count(\App\Models\Content\Review::class),
            'videos' => self::count(\App\Models\Content\Video::class),
            'playlists' => self::count(\App\Models\Content\Playlist::class),
            'macros' => self::count(\App\Models\Game\LevelReplay::class),
            //'nongs' => self::count(\App\Models\Content\Song::class),
        ];
    }

    public static function patreon()
    {
        $patreon = Cache::get('statistics:patreon');
        if (! $patreon) {
            try {
                $res = Http::withToken(config('hyperbolus.patreon_token'))
                    ->get('https://patreon.com/api/oauth2/v2/campaigns/1078668?fields%5Bcampaign%5D=patron_count')
                    ->json();
                Cache::put('statistics:patreon', $res, 300);
                $patreon = $res;
            } catch (Exception $e) {

            }
        }
        // Fake it 'til you make it
        //$patreon['data']['attributes']['patron_count'] = 20;
        return $patreon;
    }

    public static function count($model)
    {
        $table = app($model)->getTable();
        $key = 'statistics:'.$table;
        $value = Cache::get($key);
        if ($value === null) {
            $value = (new $model)->count();
            Cache::put($key, $value, 300);
        }

        return $value;
    }
}
