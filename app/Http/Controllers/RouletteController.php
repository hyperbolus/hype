<?php

namespace App\Http\Controllers;

use App\Actions\Hydrate;
use App\Models\Level;
use App\Models\Playlist;
use App\Models\Review;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouletteController extends Controller
{
    public function __invoke(Request $request)
    {
        $levels = [];
        $playlist = null;

        if(!$request->has('seed')) {
            return redirect($request->fullUrlWithQuery(['seed' => mt_rand(10000, 99999)]));
        }

        if ($request->string('type') == 'playlist') {
            $playlist = Playlist::query()->with(['owner', 'levels' => function ($query) use ($request) {
                $query->inRandomOrder($request->integer('seed'));
            }])->findOrFail($request->integer('id'));
            $levels = $playlist->levels;
            $playlist = $playlist->makeHidden('levels');
        }

        return Inertia::render('Roulette', [
            'levels' => $levels,
            'playlist' => $playlist,
            'progress' => $request->integer('progress'),
        ]);
    }
}
