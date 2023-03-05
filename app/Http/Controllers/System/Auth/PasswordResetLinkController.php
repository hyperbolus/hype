<?php

namespace App\Http\Controllers\System\Auth;

use function back;
use function config;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function session;
use function trans;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the reset password link request view.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Send a reset link to the given user.
     *
     * @param  Request  $request
     * @return JsonResponse|RedirectResponse
     *
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $request->validate(['email' => 'required|email']);

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = $this->broker()->sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return $request->wantsJson()
                ? new JsonResponse(['message' => trans($status)], 200)
                : back()->with('status', trans($status));
        } else {
            if ($request->wantsJson()) {
                throw ValidationException::withMessages([
                    'email' => [trans($status)],
                ]);
            }

            return back()
                ->withInput($request->only('email'))
                ->withErrors(['email' => trans($status)]);
        }
    }

    /**
     * Get the broker to be used during password reset.
     *
     * @return PasswordBroker
     */
    protected function broker(): PasswordBroker
    {
        return Password::broker(config('fortify.passwords'));
    }
}
