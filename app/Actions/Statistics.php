<?php

namespace App\Actions;

use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
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
            'nongs' => self::count(\App\Models\Content\Song::class),
        ];
    }

    public static function patreon()
    {
        $patreon = Cache::get('statistics:patreon');
        if (! $patreon) {
            try {
                $res = Http::withToken(config('hyperbolus.patreon_token'))
                    ->get('https://patreon.com/api/oauth2/v2/campaigns/1078668?include=goals&fields%5Bgoal%5D=description,amount_cents,completed_percentage')
                    ->json();
                Cache::put('statistics:patreon', $res, 600);
                $patreon = $res;
            } catch (Exception $e) {

            }
        }
        // Fake it 'til you make it
        //$patreon['included'][0]['attributes']['completed_percentage'] = 100;
        return $patreon;
    }

    public static function count($model)
    {
        $table = app($model)->getTable();
        $key = 'statistics:'.$table;
        $value = Cache::get($key);
        if ($value === null) {
            $value = DB::table($table)->count();
            Cache::put($key, $value, now()->addHour());
        }

        return $value;
    }
}
