<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request): \Inertia\Response
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
        $users = User::withCount('reviews');
        if ($request->sortBy == 1) {
            $users->orderByRaw('LOWER(name) ' . $directions[$request->sortDir] ?? 'ASC');
        } else {
            $users->orderBy($attributes[$request->sortBy] ?? 'id', $directions[$request->sortDir] ?? 'ASC');
        }
        return Inertia::render('Users/Index', [
            'users' => $users->get(),
            'filters' => [
                'sortBy' => $request->sortBy ?? 0,
                'sortDir' => $request->sortDir ?? 1,
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User $user
     * @return \Inertia\Response
     */
    public function show(Request $request, $id)
    {
        return Inertia::render('Users/Show', [
            'userProfile' => User::find($id)->load(['reviews', 'reviews.level'])
        ]);
    }
}
