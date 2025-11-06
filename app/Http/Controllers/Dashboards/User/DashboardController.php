<?php

namespace App\Http\Controllers\Dashboards\User;

use App\Dashboards\UserDashboard;
use App\Hype;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

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
        return UserDashboard::page('settings.home');
    }

    public function account(): Responsable
    {
        /**
         * @var User $user
         */
        $user = auth()->user();

        return UserDashboard::page('settings.account', [
            'profile' => $user->makeVisible(['email']),
        ]);
    }

    public function profile(): Responsable
    {
        return UserDashboard::page('settings.profile', [
            'flags' => Hype::$flags,
        ]);
    }

    public function show(): Responsable
    {
        return UserDashboard::page('settings.connections');
    }
}
