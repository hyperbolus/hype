<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes([
            'middleware' => [
                'web',
                InitializeTenancyByDomain::class,
                PreventAccessFromCentralDomains::class
            ]
        ]);

        Route::middleware([
            'web',
            InitializeTenancyByDomain::class,
            PreventAccessFromCentralDomains::class,
        ])->group(base_path('routes/channels.php'));
    }
}
