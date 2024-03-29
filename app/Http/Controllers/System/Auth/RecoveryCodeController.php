<?php

namespace App\Http\Controllers\System\Auth;

use App\Actions\GenerateNewRecoveryCodes;
use function back;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use function response;

class RecoveryCodeController extends Controller
{
    /**
     * Get the two factor authentication recovery codes for authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (! $request->user()->two_factor_secret ||
            ! $request->user()->two_factor_recovery_codes) {
            return [];
        }

        return response()->json(json_decode(decrypt(
            $request->user()->two_factor_recovery_codes
        ), true));
    }

    /**
     * Generate a fresh set of two-factor authentication recovery codes.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Actions\GenerateNewRecoveryCodes  $generate
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, GenerateNewRecoveryCodes $generate)
    {
        $generate($request->user());

        return $request->wantsJson()
                    ? new JsonResponse('', 200)
                    : back()->with('status', 'recovery-codes-generated');
    }
}
