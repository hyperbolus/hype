<?php

namespace App\Http\Middleware;

use App\Models\IP;
use App\Models\System\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogIP
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response) $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            /**
             * @var User $user
             */
            $user = auth()->user();

            $ip = $user->ips()->where('address', $request->ip())->get()->first();

            if (!$ip)  {
                $ip = new IP();
                $ip->user_id = $user->id;
                $ip->address = $request->ip();
            }

            $ip->last_seen_at = now();
            $ip->save();
        }

        return $next($request);
    }
}
