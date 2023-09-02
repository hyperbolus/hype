<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Facades\Image;

class DashboardConnectionsController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Dashboard/Connections');
    }
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'action' => 'required'
        ]);

        /**
         * @type User $user
         */
        $user = auth()->user();
        switch ($request->string('action')) {
            case 'generate code':
                $request->validate([
                    'username' => 'required'
                ]);

                Cache::put('gd:link:' . $request->user()->id . ',' . $request->string('username'), '');
                break;
            case 'check messages':
                $request->validate([
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'current_password',
                ]);
                $user->email = $request->input('email');
                $user->save();

                break;

        }

        return back();
    }
}
