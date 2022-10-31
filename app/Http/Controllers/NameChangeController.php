<?php

namespace App\Http\Controllers;

use App\Models\NameChange;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NameChangeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $id
     * @return Response
     */
    public function index($id): Response
    {
        $user = User::query()->find($id);
        if ($user === null) {
            abort(404);
        }

        return Inertia::render('Users/Names', [
            'profile' => $user,
            'names' => NameChange::whereUserId($id)->get()
        ]);
    }
}
