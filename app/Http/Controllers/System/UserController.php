<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Content\Review;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $attributes = [
            'id',
            'name',
            'reputation',
            'credits',
            'reviews_count',
        ];

        $directions = [
            'DESC',
            'ASC',
        ];

        $sorting = [
            'sortBy' => $request->integer('sortBy'),
            'sortDir' => $request->integer('sortDir'),
        ];

        $sorting['sortBy'] = $sorting['sortBy'] < count($attributes) ? $sorting['sortBy'] : 0;
        $sorting['sortDir'] = $sorting['sortDir'] < count($directions) ? $sorting['sortDir'] : 0;

        $users = User::query()
            ->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'reputation', 'credits'])
            ->withCount('reviews');

        if ($sorting['sortBy'] === 1) {
            $users->orderByRaw('LOWER(name) '.$directions[$sorting['sortDir']]);
        } else {
            $users->orderBy($attributes[$sorting['sortBy']], $directions[$sorting['sortDir']]);
        }

        return Inertia::render('Users/Index', [
            'users' => $users->paginate(18)->appends($sorting),
            'filters' => $sorting,
        ]);
    }

    public function show(User $user): Responsable
    {
        // TODO: add all ratings and condense into single query
        $counts = $user->reviews()
            ->selectRaw('rating_overall, COUNT(*) as count')
            ->groupBy('rating_overall')
            ->get()
            ->keyBy('rating_overall')
            ->map(fn(Review $review) => $review->count);

        $curve = [
            0 => $counts[0] ?? 0,
            1 => $counts[1] ?? 0,
            2 => $counts[2] ?? 0,
            3 => $counts[3] ?? 0,
            4 => $counts[4] ?? 0,
            5 => $counts[5] ?? 0,
            6 => $counts[6] ?? 0,
            7 => $counts[7] ?? 0,
            8 => $counts[8] ?? 0,
            9 => $counts[9] ?? 0,
            10 => $counts[10] ?? 0,
        ];

        // TODO: appends
        return page('Users/Show', [
            'profile' => $user->loadCount(['threads', 'posts', 'names']),
            'comments' => $user->comments()->latest()->paginate(10, ['*'], 'comments'),
            'reviews' => Review::withReview()
                ->latest()
                ->where('user_id', $user->id)
                ->with('level')
                ->paginate(5, ['*'], 'reviews'),
            'curve' => $curve
        ])->meta('Profile of ' . $user->name, $user->bio ?? 'This user has no bio.')
            ->breadcrumbs([
                [
                    'text' => 'Users',
                    'url' => route('users.index'),
                ]
            ]);
    }
}
