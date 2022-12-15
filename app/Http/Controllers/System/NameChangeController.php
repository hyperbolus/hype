<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\NameChange;
use App\Models\System\User;
use Inertia\Inertia;
use Inertia\Response;

class NameChangeController extends Controller
{
    public function index($id): Response
    {
        $user = User::query()->findOrFail($id);

        return Inertia::render('Users/Names', [
            'profile' => $user,
            'names' => NameChange::whereUserId($id)->get()
        ]);
    }
}
