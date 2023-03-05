<?php

namespace App\Http\Controllers\Forge;

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
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Beta/Developer', [
            'clients' => Client::query()->where('user_id', '=', $request->user()->id),
        ]);
    }

    /**
     * Create a new API token.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }

    /**
     * Update the given API token's permissions.
     */
    public function update(Request $request): JsonResponse|RedirectResponse
    {
        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }

    /**
     * Delete the given API token.
     */
    public function destroy(Request $request): JsonResponse|RedirectResponse
    {
        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'profile-information-updated');
    }
}
