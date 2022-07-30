<?php

namespace App\Http\Controllers;

use App\Yggdrasil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{

    /**
     * Update the user's password.
     *
     * @param Request $request
     * @return RedirectResponse|JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request): JsonResponse|RedirectResponse
    {
        $user = $request->user();
        $input = $request->all();

        Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password' => Yggdrasil::passwordRules(),
        ])->after(function ($validator) use ($user, $input) {
            if (! isset($input['current_password']) || ! Hash::check($input['current_password'], $user->password)) {
                $validator->errors()->add('current_password', __('The provided password does not match your current password.'));
            }
        })->validateWithBag('updatePassword');

        $user->forceFill([
            'password' => Hash::make($input['password']),
        ])->save();

        return $request->wantsJson() ? new JsonResponse('', 200) : back()->with('status', 'password-updated');
    }
}
