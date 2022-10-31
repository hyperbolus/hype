<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
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
        $users = User::query()->withCount('reviews');
        if ($request->sortBy == 1) {
            $users->orderByRaw('LOWER(name) ' . $directions[$request->sortDir] ?? 'ASC');
        } else {
            $users->orderBy($attributes[$request->sortBy] ?? 'id', $directions[$request->sortDir] ?? 'ASC');
        }
        return Inertia::render('Users/Index', [
            'users' => $users->paginate(10),
            'filters' => [
                'sortBy' => $request->sortBy ?? 0,
                'sortDir' => $request->sortDir ?? 1,
            ]
        ]);
    }

    /**
     * Display user profile
     *
     * @param $id
     * @return Response
     */
    public function show($id): Response
    {
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
