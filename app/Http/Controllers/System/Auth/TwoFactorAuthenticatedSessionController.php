<?php

namespace App\Http\Controllers\System\Auth;

use App\Events\RecoveryCodeReplaced;
use App\Http\Requests\TwoFactorLoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function __;
use function event;
use function redirect;

class TwoFactorAuthenticatedSessionController extends Controller
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
     * Show the two-factor authentication challenge view.
     *
     * @param TwoFactorLoginRequest $request
     * @return Response
     */
    public function create(TwoFactorLoginRequest $request): Response
    {
        if (! $request->hasChallengedUser()) {
            throw new HttpResponseException(redirect()->route('login'));
        }

        return Inertia::render('Auth/TwoFactorChallenge');
    }

    /**
     * Attempt to authenticate a new session using the two factor authentication code.
     *
     * @param TwoFactorLoginRequest $request
     * @return RedirectResponse|JsonResponse
     * @throws ValidationException
     */
    public function store(TwoFactorLoginRequest $request): JsonResponse|RedirectResponse
    {
        $user = $request->challengedUser();

        if ($code = $request->validRecoveryCode()) {
            $user->replaceRecoveryCode($code);

            event(new RecoveryCodeReplaced($user, $code));
        } elseif (! $request->hasValidCode()) {
            $message = __('The provided two factor authentication code was invalid.');

            if ($request->wantsJson()) {
                throw ValidationException::withMessages([
                    'code' => [$message],
                ]);
            }

            return redirect()->route('two-factor.login')->withErrors(['email' => $message]);
        }

        $this->guard->login($user, $request->remember());

        $request->session()->regenerate();

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect()->intended(RouteServiceProvider::HOME);
    }
}
