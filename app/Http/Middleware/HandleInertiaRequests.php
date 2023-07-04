<?php

namespace App\Http\Middleware;

use App\Actions\Statistics;
use App\Models\System\Message;
use App\Models\System\Setting;
use App\Models\System\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     *
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
     *
     * @param Request $request
     * @return array
     */
    public function share(Request $request): array
    {
        $firstLoad = $request->hasHeader('X-Inertia') ? [] : [
            'statistics' => [
                'counts' => Statistics::all(),
                'patreon' => Statistics::patreon()
            ],
            'settings' => (function () {
                $settings = Setting::query()->where('public', '=', true)->get()->map(function (Setting $setting) {
                    $setting->makeHidden(['key']);
                    if ($setting->type === 4) {
                        $setting->value = json_decode($setting->value);
                    }

                    return $setting;
                })->groupBy('site')->mapWithKeys(function ($group) {
                    return $group->keyBy('key');
                });

                $settings['_report_reasons'] = config('hyperbolus.report_reasons');

                return clock($settings);
            })(),
        ];

        return array_merge(parent::share($request), array_filter([
            'app' => function () use ($firstLoad, $request) {
                return [
                    'auth' => auth()->check(),
                    'flash' => $request->session()->get('flash', []),
                    'csrf' => csrf_token(),
                    'request_time' => microtime(true) - LARAVEL_START,
                    ...$firstLoad,
                ];
            },
            'user' => function () use ($request) {
                if (!$request->user()) {
                    return null;
                }

                return array_merge($request->user()->toArray(), [
                    'impersonating' => app('impersonate')->isImpersonating(),
                    'two_factor_enabled' => !is_null($request->user()->two_factor_secret),
                    //'linked_accounts' => $request->user()->accounts,
                    'roles' => $request->user()->roles->pluck('name'),
                    'notifications' => (function () use ($request) {
                        $user = $request->user();
                        /**
                         * @type User $user
                         */
                        return $user->unreadNotifications()->get();
                    })(),
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
