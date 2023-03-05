<?php

namespace App\Http\Controllers\System\Auth;

use function back;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Passport\Client;

class ConnectionController extends Controller
{
    /**
     * Show the user a list of their connections
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $data = [
            'tokens' => $request->user()->tokens->map(function ($token) {
                return $token->toArray() + [
                    'client_name' => Client::find($token->client_id)->name,
                ];
            }),
        ];

        return Inertia::render('Beta/Connections', $data);
    }

    /**
     * Delete the given connection
     *
     * @param  Request  $request
     * @param  string  $tokenId
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Request $request, string $tokenId): JsonResponse|RedirectResponse
    {
        $request->user()->tokens()->where('id', $tokenId)->first()->revoke();

        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }
}
