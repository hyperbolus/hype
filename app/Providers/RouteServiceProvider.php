<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const string HOME = '/';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api')
                ->middleware([
                    'api',
                    InitializeTenancyByDomain::class,
                    PreventAccessFromCentralDomains::class
                ])
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware(['web'])
                ->domain(config('app.url'))
                ->namespace($this->namespace)
                ->group(function () {
                    Route::get('/', function () {
                        return ':^)';
                    });
                });

            foreach (['hyperbolus.net'] as $domain) {
                Route::middleware([
                    'web',
                    InitializeTenancyByDomain::class,
                    PreventAccessFromCentralDomains::class,
                ])->namespace($this->namespace)
                    ->group(base_path('routes/auth.php'));

                Route::middleware([
                    'web',
                    InitializeTenancyByDomain::class,
                    PreventAccessFromCentralDomains::class,
                ])->namespace($this->namespace)
                    ->group(function () use ($domain) {
                        Route::domain(config('app.domains.wiki'))->get('/auth/recapture', function (Request $request) {
                            abort_if(!$request->hasValidSignature(), 400, 'Insecure URL');

                            // Like a passport! Except Passport is a Laravel product, so let's not confuse anyone.
                            $visa = Cache::get('auth::migration.' . $request->string('token'));

                            // If our URL is signed, this should never happen; otherwise, we fucked up!
                            abort_if(!$visa, 400, 'Invalid Token');

                            // Some little check. Not foolproof, but can stand in the way of migration URL theft
                            // IPs are an unreliable substitute for this check for various reasons
                            abort_if($request->userAgent() !== $visa['agent'], 400, 'Insecure Origin');

                            // Invalidate the migration token to prevent replay attacks from session thieves
                            Cache::forget('auth::migration.' . $request->string('token'));

                            // Set the session. Both domains should now share one session.
                            // NOTE: They are the SAME session! If one is logged out, the other is as well.
                            // NOTE: Because we manually set cookies, this does NOT fire login events!
                            session()->setId($visa['session']);
                            session()->start();

                            // If we should also mirror the user's "remember me" cookie from the origin site
                            if ($visa['remember']) {
                                // TODO: Try to use protected SessionGuard::queueRecallerCookie instead of reimplementing
                                $user = $request->user();
                                $recaller = $user->getAuthIdentifier().'|'.$user->getRememberToken().'|'.$user->getAuthPassword();

                                // NOTE: Technically, this will extend the expiration for *this* cookie; not the other.
                                // TODO: You can *set* the remember duration, but not *get* it; so we hardcode it.
                                Cookie::queue(Cookie::make(auth()->getRecallerName(), $recaller, 576000));
                            }

                            return redirect('/');
                        })->name('wiki$auth::recapture')->middleware(['throttle:5,10']);

                        Route::domain($domain)->group(base_path('routes/web.php'));
                        Route::domain(config('app.domains.wiki'))->name('wiki$')->group(base_path('routes/wiki.php'));
                    });
            }
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
