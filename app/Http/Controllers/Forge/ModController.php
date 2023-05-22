<?php

namespace App\Http\Controllers\Forge;

use App\Http\Controllers\Controller;
use App\Models\Forge\Mod;
use App\Models\System\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ModController extends Controller
{
    public function index(Request $request): Response
    {
        $attributes = [
            'id',
            'rating',
            'downloads_count',
            'reviews_count',
        ];
        $directions = [
            'DESC',
            'ASC',
        ];
        $sorting = [
            'sortBy' => $request->integer('sortBy'),
            'sortDir' => $request->integer('sortDir'),
            'filter' => $request->integer('filter'),
        ];

        $sorting['sortBy'] = $sorting['sortBy'] < count($attributes) ? $sorting['sortBy'] : 0;
        $sorting['sortDir'] = $sorting['sortDir'] < count($directions) ? $sorting['sortDir'] : 0;
        $sorting['filter'] = $sorting['filter'] < 3 ? $sorting['filter'] : 0;

        $mods = Mod::query();

        if (auth()->check()) {
            if ($sorting['filter'] === 1) {
                /**
                 * @var User $user
                 */
                $user = auth()->user();
                $mods = $user->reviewedLevels();
            } else if ($sorting['filter'] === 2) {
                /**
                 * @var User $user
                 */
                $user = auth()->user();
                $mods = $mods->whereDoesntHave('reviews', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                });
            }
        }

        return Inertia::render('Mods/Index', [
            'mods' => $mods
                ->orderBy($attributes[$sorting['sortBy']], $directions[$sorting['sortDir']])
                ->paginate(6)
                ->appends($sorting),
            'filters' => $sorting,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Mod $mod): Response
    {
        return Inertia::render('Mods/Show', [
            'mod' => $mod
        ]);
    }

    public function edit(Mod $mod)
    {
        //
    }

    public function update(Request $request, Mod $mod)
    {
        //
    }

    public function destroy(Mod $mod)
    {
        //
    }
}
