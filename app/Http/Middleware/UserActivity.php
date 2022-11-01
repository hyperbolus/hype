<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class UserActivity
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request);
    }

    public function terminate(): void
    {
        if(auth()->check()) {
            /**
             * @var User $user
             */
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
