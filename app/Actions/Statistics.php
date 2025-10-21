<?php

namespace App\Actions;

use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class Statistics
{
    public static function all(): array
    {
        return self::count([
            'users' => \App\Models\System\User::class,
            'threads' => \App\Models\Content\Thread::class,
            'posts' => \App\Models\Content\Post::class,
            'levels' => \App\Models\Game\Level::class,
            'reviews' => \App\Models\Content\Review::class,
            'videos' => \App\Models\Content\Video::class,
            'playlists' => \App\Models\Content\Playlist::class,
            'macros' => \App\Models\Game\LevelReplay::class,
        ]);
    }

    public static function patreon()
    {
        return [];

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

    public static function count(array|string $models)
    {
        // Takes many or one, if one put it in an array
        if (!is_array($models)) $models = [$models];

        // get the cache names
        $keys = array_map(fn ($model) => 'statistics:' . app($model)->getTable(), $models);

        // fetch all at once, misses will be null
        $values = Cache::many(array_values($keys));

        // fetch count for misses
        foreach ($models as $name => $model) $values[$keys[$name]] = $models[$name] = (int) ($values[$keys[$name]] ?: (new $model)->count());

        // cache our new values
        Cache::putMany(array_filter($values, fn ($v) => is_null($v)), 600);

        return $models;
    }
}
