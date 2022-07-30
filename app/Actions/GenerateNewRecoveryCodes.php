<?php

namespace App\Actions;

use App\Yggdrasil;
use Illuminate\Support\Collection;
use App\Events\RecoveryCodesGenerated;

class GenerateNewRecoveryCodes
{
    /**
     * Generate new 2fa recovery codes for the user.
     *
     * @param  mixed  $user
     * @return void
     */
    public function __invoke($user)
    {
        $user->forceFill([
            'two_factor_recovery_codes' => encrypt(json_encode(Collection::times(8, function () {
                return Yggdrasil::generateRecoveryCode();
            })->all())),
        ])->save();

        RecoveryCodesGenerated::dispatch($user);
    }
}
