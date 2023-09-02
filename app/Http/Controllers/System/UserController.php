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
            ->select(['id', 'name', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url'])
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
        // TODO: appends
        return page('Users/Show', [
            'profile' => $user->loadCount(['threads', 'posts', 'names']),
            'comments' => $user->comments()->paginate(10, ['*'], 'comments'),
            'reviews' => Review::query()->where('user_id', $user->id)->with('level')->paginate(5, ['*'], 'reviews'),
        ])->meta('Profile of ' . $user->name, $user->bio ?? 'This user has no bio.')
            ->breadcrumbs([
                [
                    'text' => 'Users',
                    'url' => route('users.index'),
                ],
                [
                    'text' => $user->name . '\'s Profile',
                    'url' => route('users.show', $user->id),
                ]
            ]);
    }
}
