<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\System\User;
use App\Hype;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        /**
         * @type User $user
         */
        $user = $request->user();

        switch ($request->string('action')) {
            case 'update password':
                $request->validate([
                    'current_password' => 'current_password',
                    'new_password' => ['required', 'confirmed', 'min:8'],
                ]);
                $user->password = Hash::make($request->input('new_password'));
                $user->save();
                break;
            case 'update email':
                $request->validate([
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'current_password',
                ]);
                $user->email = $request->input('email');
                $user->email_verified_at = null;
                $user->save();

                $user->sendEmailVerificationNotification();

                return redirect()->route('auth::verification.notice');

                break;
        }

        return back();
    }

    public function home(): Responsable
    {
        return page('Dashboard/Home')->meta('Settings', 'Manage your account');
    }

    public function account(): Response
    {
        /**
         * @var User $user
         */
        $user = auth()->user();

        return Inertia::render('Dashboard/Account', [
            'profile' => $user->makeVisible(['email']),
        ]);
    }

    public function profile(): Responsable
    {
        return page('Dashboard/Profile', [
            'flags' => Hype::$flags,
        ])->meta('Edit Profile', 'Edit your public user profile');
    }
}
