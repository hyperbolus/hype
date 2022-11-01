<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  Request  $request
     */
    protected function redirectTo($request): string|null
    {
        /*if (! $request->expectsJson()) {
            return route('auth::login');
        }TODO: huh????*/

        if (!auth()->check()) {
            return route('auth::login');
        }
        // TODO: if we are here, arent we already unauthed?

        return null;
    }
}
