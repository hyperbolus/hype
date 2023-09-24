<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class TrackUserReferral
{
    public function handle(Request $request, Closure $next): Response
    {
        if (\request()->has('ref') && !auth()->check()) {
            $secure = App::environment('production');
            $minutes = 60 * 24 * 30; // 30 days
            $ref = \request()->integer('ref', null);
            Cookie::queue('referrer_id', $ref, $minutes, '/', null, $secure, false);
        }

        return $next($request);
    }
}
