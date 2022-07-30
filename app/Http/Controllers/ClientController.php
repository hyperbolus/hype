<?php

namespace App\Http\Controllers;

use App\Yggdrasil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Passport\Client;

class ClientController extends Controller
{
    /**
     * Show the user API token screen.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Beta/Developer', [
            'clients' => Client::where('user_id', '=', $request->user()->id)
        ]);
    }

    /**
     * Create a new API token.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }

    /**
     * Update the given API token's permissions.
     *
     * @param Request $request
     * @param string $tokenId
     * @return JsonResponse|RedirectResponse
     */
    public function update(Request $request, string $client): JsonResponse|RedirectResponse
    {
        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }

    /**
     * Delete the given API token.
     *
     * @param Request $request
     * @param $client
     * @return JsonResponse|RedirectResponse
     */
    public function destroy(Request $request, $client): JsonResponse|RedirectResponse
    {


        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }
}
