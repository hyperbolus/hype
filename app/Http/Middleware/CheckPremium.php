<?php

namespace App\Http\Middleware;

use App\Actions\VerifyPremiumPatreon;
use App\Models\System\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CheckPremium
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
        if (auth()->check()) {
            /**
             * @var User $user
             */
            $user = auth()->user();

            if ($user->premium_expires_at < Carbon::now()) VerifyPremiumPatreon::check($user);
        }
    }
}
