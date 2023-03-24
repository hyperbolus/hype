<?php

namespace App\Http\Controllers\System\Auth;

use App\Actions\AttemptToAuthenticate;
use App\Actions\EnsureLoginIsNotThrottled;
use App\Actions\PrepareAuthenticatedSession;
use App\Actions\RedirectIfTwoFactorAuthenticatable;
use App\Http\Requests\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Pipeline;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
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
     * @param  StatefulGuard  $guard
     * @return void
     */
    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    /**
     * Show the login view.
     *
     * @return Response
     */
    public function create(Request $request): Response
    {
        if(!session()->has('url.intended')) {
            session()->put('url.intended', url()->previous());
        }

        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    /**
     * Attempt to authenticate a new session.
     *
     * @param  LoginRequest  $request
     * @return JsonResponse|RedirectResponse
     */
    public function store(LoginRequest $request): JsonResponse|RedirectResponse
    {
        return $this->loginPipeline($request)->then(function ($request) {
            return $request->wantsJson()
                ? response()->json(['two_factor' => false])
                : redirect()->intended(RouteServiceProvider::HOME);
        });
    }

    /**
     * Get the authentication pipeline instance.
     *
     * @param  LoginRequest  $request
     * @return \Illuminate\Pipeline\Pipeline
     */
    protected function loginPipeline(LoginRequest $request): \Illuminate\Pipeline\Pipeline
    {
        if (is_array(config('fortify.pipelines.login'))) {
            return (new Pipeline(app()))->send($request)->through(array_filter(
                config('fortify.pipelines.login')
            ));
        }

        return (new Pipeline(app()))->send($request)->through(array_filter([
            EnsureLoginIsNotThrottled::class,
            RedirectIfTwoFactorAuthenticatable::class,
            AttemptToAuthenticate::class,
            PrepareAuthenticatedSession::class,
        ]));
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  Request  $request
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Request $request): JsonResponse|RedirectResponse
    {
        $this->guard->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect(RouteServiceProvider::HOME);
    }
}
