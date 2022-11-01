<?php

namespace App\Http\Controllers;

use App\Models\NameChange;
use App\Models\User;
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
