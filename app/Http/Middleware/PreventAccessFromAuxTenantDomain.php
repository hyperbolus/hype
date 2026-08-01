<?php

namespace App\Http\Middleware;

use App\Hype;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventAccessFromAuxTenantDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->getHost() !== Hype::getTenantMainDomain()->domain) abort(404);

        return $next($request);
    }
}
