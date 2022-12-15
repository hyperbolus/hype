<?php

namespace App\Http\Controllers\System\Auth;

use App\Yggdrasil;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use function back;
use function optional;

class ApiTokenController extends Controller
{
    /**
     * Show the user API token screen.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $data = [
            'tokens' => $request->user()->tokens->map(function ($token) {
                return $token->toArray() + [
                        'last_used_ago' => optional($token->last_used_at)->diffForHumans(),
                    ];
            }),
            'availablePermissions' => Yggdrasil::$permissions,
            'defaultPermissions' => Yggdrasil::$defaultPermissions,
        ];

        return Inertia::render('API/Index', $data);
    }

    /**
     * Create a new API token.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $token = $request->user()->createToken(
            $request->name,
            Yggdrasil::validPermissions($request->input('permissions', []))
        )->accessToken;

        return back()->with('flash', [
            'token' => $token
        ]);
    }

    /**
     * Update the given API token's permissions.
     *
     * @param Request $request
     * @param string $tokenId
     * @return RedirectResponse
     */
    public function update(Request $request, string $tokenId): RedirectResponse
    {
        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'string',
        ]);

        $token = $request->user()->tokens()->where('id', $tokenId)->firstOrFail();

        $token->forceFill([
            'scopes' => Yggdrasil::validPermissions($request->input('permissions', [])),
        ])->save();

        return back(303);
    }

    /**
     * Delete the given API token.
     *
     * @param Request $request
     * @param string $tokenId
     * @return RedirectResponse
     */
    public function destroy(Request $request, string $tokenId): RedirectResponse
    {
        $request->user()->tokens()->where('id', $tokenId)->first()->revoke();
        return back(303);
    }
}
