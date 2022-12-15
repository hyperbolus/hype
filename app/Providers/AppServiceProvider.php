<?php

namespace App\Providers;

use App\Models\Content\Forum;
use App\Models\System\User;
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
        // Recursive Migrations
        $dirs = glob(database_path('migrations') . '/*' , GLOB_ONLYDIR);
        $paths = array_merge([database_path('migrations')], $dirs);
        $this->loadMigrationsFrom($paths);

        Relation::enforceMorphMap([
            //
        ]);
    }
}
