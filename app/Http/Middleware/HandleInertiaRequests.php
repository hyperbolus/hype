<?php

namespace App\Http\Middleware;

use App\Actions\Statistics;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
                    'stats' => Statistics::all()
                ];
            },
            'user' => function () use ($request) {
                if (! $request->user()) {
                    return null;
                }

                return array_merge($request->user()->toArray(), [
                    'impersonating' => app('impersonate')->isImpersonating(),
                    'two_factor_enabled' => !is_null($request->user()->two_factor_secret),
                    //'linked_accounts' => $request->user()->accounts,
                    'roles' => $request->user()->roles->pluck('name'),
                    'notifications' => $request->user()->notifications,
                    'messages' => Message::query()->where('recipient_id', '=', $request->user()->id)->where('read_at', '=', null)->count(),
                ]);
            },
            'errors' => [],
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
