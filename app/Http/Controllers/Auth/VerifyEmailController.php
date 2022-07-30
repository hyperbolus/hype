<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\VerifyEmailRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use function event;
use function redirect;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param VerifyEmailRequest $request
     * @return JsonResponse|RedirectResponse
     */
    public function __invoke(VerifyEmailRequest $request): JsonResponse|RedirectResponse
    {
        /* TODO: Something smells here..? Duplicated code, what is the intended flow here? Probably something to do
        * with not duplicating that event, now that code has been ejected from VerifyEmailResponse it may be better to
        * refactor to prevent that duplicated fragment
        */
        if ($request->user()->hasVerifiedEmail()) {
            return $request->wantsJson()
                ? new JsonResponse('', 204)
                : redirect()->intended(RouteServiceProvider::HOME.'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect()->intended(RouteServiceProvider::HOME.'?verified=1');

    }
}
