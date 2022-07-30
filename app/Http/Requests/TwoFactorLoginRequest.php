<?php

namespace App\Http\Requests;

use App\Providers\TwoFactorAuthenticationProvider;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorLoginRequest extends FormRequest
{
    /**
     * The user attempting the two factor challenge.
     *
     * @var mixed
     */
    protected $challengedUser;

    /**
     * Indicates if the user wished to be remembered after login.
     *
     * @var bool
     */
    protected bool $remember;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => 'nullable|string',
            'recovery_code' => 'nullable|string',
        ];
    }

    /**
     * Determine if the request has a valid two factor code.
     *
     * @return bool
     * @throws ValidationException
     */
    public function hasValidCode()
    {
        return $this->code && tap((new TwoFactorAuthenticationProvider(new Google2FA()))->verify(
                decrypt($this->challengedUser()->two_factor_secret), $this->code
            ), function ($result) {
                if ($result) {
                    $this->session()->forget('login.id');
                }
            });
    }

    /**
     * Get the valid recovery code if one exists on the request.
     *
     * @return string|null
     * @throws ValidationException
     */
    public function validRecoveryCode()
    {
        if (!$this->recovery_code) {
            return null;
        }

        return tap(collect($this->challengedUser()->recoveryCodes())->first(function ($code) {
            return hash_equals($this->recovery_code, $code) ? $code : null;
        }), function ($code) {
            if ($code) {
                $this->session()->forget('login.id');
            }
        });
    }

    /**
     * Determine if there is a challenged user in the current session.
     *
     * @return bool
     */
    public function hasChallengedUser()
    {
        if ($this->challengedUser) {
            return true;
        }

        $model = app(StatefulGuard::class)->getProvider()->getModel();

        return $this->session()->has('login.id') &&
            $model::find($this->session()->get('login.id'));
    }

    /**
     * Get the user that is attempting the two factor challenge.
     *
     * @return mixed
     * @throws ValidationException
     */
    public function challengedUser()
    {
        if ($this->challengedUser) {
            return $this->challengedUser;
        }

        $model = app(StatefulGuard::class)->getProvider()->getModel();

        if (!$this->session()->has('login.id') ||
            !$user = $model::find($this->session()->get('login.id'))) {
            $message = __('The provided two factor authentication code was invalid.');

            if (request()->wantsJson()) {
                throw ValidationException::withMessages([
                    'code' => [$message],
                ]);
            }

            throw new HttpResponseException(redirect()->route('auth::2fa.login')->withErrors(['email' => $message]));
        }

        return $this->challengedUser = $user;
    }

    /**
     * Determine if the user wanted to be remembered after login.
     *
     * @return bool
     */
    public function remember()
    {
        if (!$this->remember) {
            $this->remember = $this->session()->pull('login.remember', false);
        }

        return $this->remember;
    }
}
