<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        \Stancl\Tenancy\Features\TenantConfig::$storageToConfigMap = [
            'scout_prefix' => 'scout.prefix',
        ];

        Relation::enforceMorphMap(config('hyperbolus.morph_map'));
    }
}
