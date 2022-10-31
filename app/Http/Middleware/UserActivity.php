<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class UserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request);
    }

    public function terminate($request, $reponse) {
        if(auth()->check()) {
            $user = auth()->user();

            if($user->last_seen->diffInMinutes() <= 5) {
                $user->time_online = $user->time_online + $user->last_seen->diffInSeconds();
            }

            $user->last_seen = Carbon::now();
            $user->timestamps = false;
            $user->save();
        }
    }
}
