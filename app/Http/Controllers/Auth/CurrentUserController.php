<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use function __;
use function request;
use function url;

class CurrentUserController extends Controller
{
    /**
     * Delete the current user.
     *
     * @param Request $request
     * @param StatefulGuard $guard
     * @throws ValidationException
     */
    public function destroy(Request $request, StatefulGuard $guard)
    {
        // Duplicated procedure, ConfirmPassword.php action. Also in ConfirmablePasswordController.php
        $confirmed = $guard->validate([
            'email' => $request->user()->email,
            'password' => request('password'),
        ]);

        if (! $confirmed) {
            throw ValidationException::withMessages([
                'password' => __('The password is incorrect.'),
            ]);
        }

        $request->user()->fresh()->tokens->each->delete();
        $request->user()->fresh()->delete();

        $guard->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Inertia::location(url('/'));
    }
}
