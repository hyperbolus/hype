<?php

namespace App\Http\Controllers\System\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function __;
use function back;
use function redirect;
use function request;

class ConfirmablePasswordController extends Controller
{
    /**
     * The guard implementation.
     *
     * @var StatefulGuard
     */
    protected StatefulGuard $guard;

    /**
     * Create a new controller instance.
     *
     * @param StatefulGuard $guard
     * @return void
     */
    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    /**
     * Show the confirm password view.
     *
     * @return Response
     */
    public function show(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    /**
     * Confirm the user's password.
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        // Duplicated procedure, ConfirmPassword.php action. Also in CurrentUserController.php
        $confirmed = $this->guard->validate([
            'email' => $request->user()->email,
            'password' => request('password'),
        ]);

        if ($confirmed) {
            $request->session()->put('auth.password_confirmed_at', time());
        }

        if($confirmed) {
            return $request->wantsJson()
                ? new JsonResponse('', 201)
                : redirect()->intended(RouteServiceProvider::HOME);
        } else {
            $message = __('The provided password was incorrect.');

            if ($request->wantsJson()) {
                throw ValidationException::withMessages([
                    'password' => [$message],
                ]);
            }

            return back()->withErrors(['password' => $message]);
        }
    }
}
