<?php

namespace App\Http\Controllers\Dashboards\User;

use App\Dashboards\UserDashboard;
use App\Hype;
use App\Models\Cosmetic;
use App\Models\System\User;
use App\Rules\AllowedUserNamespace;
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
            case 'update username':
                if (!$user->isPremium()) invalid('premium', 'You must be a Patreon supporter to change your username.');

                // Name changes in the last month
                $monthChanges = $user->names()
                    ->where('created_at', '>', now()->subMonth())
                    ->latest()
                    ->get();

                // Next date when you have a name change available

                $nextChangeableDate = $monthChanges->count() > 0 ? $monthChanges->last()->created_at->addMonth() : now();

                if ($monthChanges->count() > 1) invalid('changes', 'You can only change your name 2 times in a month. Next change in ' . $nextChangeableDate->diff(now()));

                $request->validate([
                    'name' => ['required', 'string', 'min:3', 'max:24', 'unique:users', 'regex:/^[a-zA-Z0-9_]*$/', new AllowedUserNamespace],
                    'password' => 'current_password',
                ]);

                $user->changeName($request->string('name'), changer: $user->id);

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

    public function profile(Request $request): Responsable
    {
        return UserDashboard::page('settings.profile', [
            'flags' => Hype::$flags,
            'cosmetics' => Cosmetic::all()->groupBy('type'),
            'owned_cosmetics' => $request->user()->ownedCosmetics(),
        ]);
    }

    public function show(): Responsable
    {
        return UserDashboard::page('settings.connections');
    }
}
