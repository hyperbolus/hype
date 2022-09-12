<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use function config;
use function response;

class ConfirmedPasswordStatusController extends Controller
{
    /**
     * Get the password confirmation status.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'confirmed' => (time() - $request->session()->get('auth.password_confirmed_at', 0)) < $request->input('seconds', config('auth.password_timeout', 900)),
        ]);
    }
}
