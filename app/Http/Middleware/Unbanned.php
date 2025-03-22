<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;

class Unbanned
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return RedirectResponse|mixed|never
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && !$request->routeIs(['auth::banned', 'auth::logout']) && $request->user()->banned_at !== null) {
            return $request->expectsJson()
                ? abort(403, 'Your account has been banned')
                : Redirect::guest(URL::route('auth::banned'));
        }

        return $next($request);
    }
}

