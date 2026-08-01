<?php

namespace App\Http\Controllers\Game;

use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use Illuminate\Http\Request;

class RouletteController extends Controller
{
    public function __invoke(Request $request)
    {
        $levels = [];
        $playlist = null;

        if (!$request->has('seed')) return redirect($request->fullUrlWithQuery(['seed' => mt_rand(10000, 99999)]));

        if ($request->string('type') == 'playlist') {
            $playlist = Playlist::query()->with(['owner', 'levels' => function ($query) use ($request) {
                $query->inRandomOrder($request->integer('seed'))->with(['videos']);
            }])->findOrFail($request->integer('id'));

            $levels = $playlist->levels;
            $playlist = $playlist->makeHidden('levels');
        }

        return page('Roulette', [
            'levels' => $levels,
            'playlist' => $playlist,
            'progress' => $request->integer('progress'),
        ])->meta('Roulette', 'Play level roulette');
    }
}
