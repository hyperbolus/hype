<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Forge\Mod;
use App\Models\Forge\Style;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StyleController extends Controller
{
    public function index(Request $request)
    {
        $attributes = [
            'id',
            'rating',
            'downloads_count',
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

        $styles = Style::query();

        if (auth()->check()) {
            if ($sorting['filter'] === 1) {
                /**
                 * @var User $user
                 */
                $user = auth()->user();
                $styles = $user->reviewedLevels();
            } else if ($sorting['filter'] === 2) {
                /**
                 * @var User $user
                 */
                $user = auth()->user();
                $styles = $styles->whereDoesntHave('reviews', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                });
            }
        }

        return page('Styles/Index', [
            'styles' => $styles
                ->orderBy($attributes[$sorting['sortBy']], $directions[$sorting['sortDir']])
                ->paginate(6)
                ->appends($sorting),
            'filters' => $sorting,
        ])->meta('Styles', 'Browse a database of texture packs and styles to prettyify your experience.');
    }

    public function create(): Responsable
    {
        return page('Styles/Create')
            ->meta('Create New Style', 'blah blah blah');
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Style $style)
    {
        return page('Styles/Show', [
            'style' => $style->load(['author', 'files', 'tags'])
        ])->meta($style->name, $style->blurb);
    }

    public function edit(Style $style)
    {
        //
    }

    public function update(Request $request, Style $style)
    {
        //
    }

    public function destroy(Style $style)
    {
        //
    }
}
