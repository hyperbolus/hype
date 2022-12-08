<?php

namespace App\Http\Controllers;

use App\Models\Content\Review;
use App\Models\System\User;
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
            'reviews_count'
        ];

        $directions = [
            'DESC',
            'ASC'
        ];

        $sorting = [
            'sortBy' => $request->integer('sortBy'),
            'sortDir' => $request->integer('sortDir'),
        ];

        $sorting['sortBy'] = $sorting['sortBy'] < count($attributes) ? $sorting['sortBy'] : 0;
        $sorting['sortDir'] = $sorting['sortDir'] < count($directions) ? $sorting['sortDir'] : 0;

        $users = User::query()->withCount('reviews');

        if ($sorting['sortBy'] === 1) {
            $users->orderByRaw('LOWER(name) ' . $directions[$sorting['sortDir']]);
        } else {
            $users->orderBy($attributes[$sorting['sortBy']], $directions[$sorting['sortDir']]);
        }

        return Inertia::render('Users/Index', [
            'users' => $users->paginate(10)->appends($sorting),
            'filters' => $sorting
        ]);
    }

    public function show($id): Response
    {
        /**
         * @var User $user
         */
        $user = User::query()->find($id);
        if ($user === null) {
            abort(404);
        }

        return Inertia::render('Users/Show', [
            'profile' => $user->loadCount(['threads', 'posts', 'names']),
            'comments' => $user->comments()->paginate(10, ['*'], 'comments'),
            'reviews' => Review::query()->where('user_id', $id)->with('level')->paginate(5, ['*'], 'reviews'),
        ]);
    }
}
