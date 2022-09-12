<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use function response;

class TwoFactorQrCodeController extends Controller
{
    /**
     * Get the SVG element for the user's two-factor authentication QR code.
     *
     * @param Request $request
     * @return array|JsonResponse
     */
    public function show(Request $request): JsonResponse|array
    {
        if (is_null($request->user()->two_factor_secret)) {
            return [];
        }

        return response()->json(['svg' => $request->user()->twoFactorQrCodeSvg()]);
    }
}
