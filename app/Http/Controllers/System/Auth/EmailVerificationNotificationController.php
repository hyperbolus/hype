<?php

namespace App\Http\Controllers\System\Auth;

use function back;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use function redirect;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     *
     * @param  Request  $request
     * @return JsonResponse|RedirectResponse
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $request->wantsJson() ? new JsonResponse('', 204) : redirect()->intended();
        }

        $request->user()->sendEmailVerificationNotification();

        return $request->wantsJson() ? new JsonResponse('', 202) : back()->with('status', 'verification-link-sent');
    }
}
