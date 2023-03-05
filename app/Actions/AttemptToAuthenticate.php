<?php

namespace App\Actions;

use App\LoginRateLimiter;
use Illuminate\Auth\Events\Failed;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AttemptToAuthenticate
{
    /**
     * The guard implementation.
     *
     * @var StatefulGuard
     */
    protected StatefulGuard $guard;

    /**
     * The login rate limiter instance.
     *
     * @var LoginRateLimiter
     */
    protected LoginRateLimiter $limiter;

    /**
     * Create a new controller instance.
     *
     * @param  StatefulGuard  $guard
     * @param  LoginRateLimiter  $limiter
     * @return void
     */
    public function __construct(StatefulGuard $guard, LoginRateLimiter $limiter)
    {
        $this->guard = $guard;
        $this->limiter = $limiter;
    }

    /**
     * Handle the incoming request.
     *
     * @param  Request  $request
     * @param  callable  $next
     * @return mixed
     *
     * @throws ValidationException
     */
    public function handle(Request $request, callable $next): mixed
    {
        if ($this->guard->attempt(
            $request->only('email', 'password'),
            $request->boolean('remember'))
        ) {
            return $next($request);
        }

        $this->fireFailedEvent($request);
        $this->throwFailedAuthenticationException($request);
    }

    /**
     * Throw a failed authentication validation exception.
     *
     * @param  Request  $request
     * @return void
     *
     * @throws ValidationException
     */
    protected function throwFailedAuthenticationException(Request $request)
    {
        $this->limiter->increment($request);

        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')],
        ]);
    }

    /**
     * Fire the failed authentication attempt event with the given arguments.
     *
     * @param  Request  $request
     * @return void
     */
    protected function fireFailedEvent(Request $request)
    {
        event(new Failed(config('fortify.guard'), null, [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]));
    }
}
