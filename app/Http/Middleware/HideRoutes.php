<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HideRoutes
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(Request): (Response) $next
     * @param string $option
     * @return Response
     */
    public function handle(Request $request, Closure $next, string $option): Response
    {


        return $next($request);
    }
}
