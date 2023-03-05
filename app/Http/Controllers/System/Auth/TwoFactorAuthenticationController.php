<?php

namespace App\Http\Controllers\System\Auth;

use App\Events\TwoFactorAuthenticationDisabled;
use App\Events\TwoFactorAuthenticationEnabled;
use App\Providers\TwoFactorAuthenticationProvider;
use App\Yggdrasil;
use function back;
use function encrypt;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Collection;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\Response;

class TwoFactorAuthenticationController extends Controller
{
    /**
     * Enable two-factor authentication for the user.
     *
     * @param  Request  $request
     * @return JsonResponse|Response
     *
     * @throws \PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException
     * @throws \PragmaRX\Google2FA\Exceptions\InvalidCharactersException
     * @throws \PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException
     */
    public function store(Request $request): JsonResponse|Response
    {
        $request->user()->forceFill([
            // TODO: cleaner way to do this? maybe i should kept the og code?
            'two_factor_secret' => encrypt((new TwoFactorAuthenticationProvider(new Google2FA()))->generateSecretKey()),
            'two_factor_recovery_codes' => encrypt(json_encode(Collection::times(8, function () {
                return Yggdrasil::generateRecoveryCode();
            })->all())),
        ])->save();

        TwoFactorAuthenticationEnabled::dispatch($request->user());

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : back()->with('status', 'two-factor-authentication-enabled');
    }

    /**
     * Disable two-factor authentication for the user.
     *
     * @param  Request  $request
     * @return RedirectResponse|JsonResponse
     */
    public function destroy(Request $request): JsonResponse|RedirectResponse
    {
        $request->user()->forceFill([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
        ])->save();

        TwoFactorAuthenticationDisabled::dispatch($request->user());

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : back()->with('status', 'two-factor-authentication-disabled');
    }
}
