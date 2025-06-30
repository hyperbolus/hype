<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class LogoutDeleted
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
        if ($request->user() && Str::contains($request->user()->name, '$')) {
            Auth::logout();

            return Redirect::guest(URL::route('home'));
        }

        return $next($request);
    }
}

