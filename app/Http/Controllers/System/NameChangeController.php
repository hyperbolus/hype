<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\NameChange;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NameChangeController extends Controller
{
    public function index(Request $request, int $id): Responsable
    {
        $user = User::query()->with(['names' => function ($q) use ($request) {
            if (!(auth()->check() && $request->user()->hasRole(['moderator', 'admin']))) {
                $q->where('hidden', false);
            }
        }])->findOrFail($id);

        return page('Users/Names', [
            'profile' => $user,
        ])->meta('Username History', 'View username history of ' . $user->name)
            ->breadcrumbs([
                crumb('Users', route('users.index')),
                crumb($user->name, route('users.show', $user->id)),
            ]);
    }
}
