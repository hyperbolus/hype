<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ProfileInformationController extends Controller
{
    /**
     * Update the user's profile information.
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     * @throws ValidationException
     */
    public function update(Request $request): JsonResponse|RedirectResponse
    {
        Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($request->user()->id)],
        ])->validateWithBag('updateProfileInformation');

        if (request(['email']) !== $request->user()->email &&
            $request->user() instanceof MustVerifyEmail) {
            $request->user()->forceFill([
                'email' => request('email'),
                'email_verified_at' => null,
            ])->save();

            $request->user()->sendEmailVerificationNotification();
        }

        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }
}
