<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //\App\Models\Content\Review::class => \App\Policies\ReviewPolicy::class,
        //\App\Models\Content\Thread::class => \App\Policies\ReviewPolicy::class,
        //\App\Models\Content\Post::class => \App\Policies\ReviewPolicy::class,
        //\App\Models\Content\Playlist::class => \App\Policies\ReviewPolicy::class,
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        Passport::ignoreRoutes();
        Passport::ignoreMigrations();
    }

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Route::group([
            'as' => 'oauth2::',
            'middleware' => [
                InitializeTenancyByDomain::class, // Use tenancy initialization middleware of your choice
                PreventAccessFromCentralDomains::class,
            ],
            'prefix' => 'api/oauth2',
            'namespace' => 'Laravel\Passport\Http\Controllers',
        ], function () {
            $this->loadRoutesFrom(base_path('routes/passport.php'));
        });

        Passport::tokensCan([
            'create' => 'creates',
            'read' => 'reads',
            'update' => 'updates',
            'delete' => 'deletes',
        ]);
    }
}
