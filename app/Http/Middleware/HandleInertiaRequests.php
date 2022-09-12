<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param Request $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param Request $request
     * @return array
     */
    public function share(Request $request): array
    {

        return array_merge(parent::share($request), array_filter([
            'app' => function () use ($request) {
                return [
                    'auth' => auth()->check(),
                    'flash' => $request->session()->get('flash', []),
                    'stats' => [
                        'users' => DB::table('users')->count(),
                        'levels' => DB::table('levels')->count(),
                        'reviews' => DB::table('reviews')->count(),
                        'videos' => DB::table('videos')->count(),
                    ]
                ];
            },
            'user' => function () use ($request) {
                if (! $request->user()) {
                    return null;
                }

                return array_merge($request->user()->toArray(), [
                    'two_factor_enabled' => !is_null($request->user()->two_factor_secret),
                    'linked_accounts' => $request->user()->accounts,
                    'roles' => $request->user()->roles,
                    'notifications' => $request->user()->notifications
                ]);
            },
            'errors' => [

            ],
            'errorBags' => function () {
                return collect(optional(Session::get('errors'))->getBags() ?: [])->mapWithKeys(function ($bag, $key) {
                    return [$key => $bag->messages()];
                })->all();
            },
            'auth' => auth()->check(),
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]));
    }
}
