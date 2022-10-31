<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        \App\Models\Review::class => \App\Policies\ReviewPolicy::class,
        \App\Models\Thread::class => \App\Policies\ReviewPolicy::class,
        \App\Models\Post::class => \App\Policies\ReviewPolicy::class,
        \App\Models\Playlist::class => \App\Policies\ReviewPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::tokensCan([
            'create' => 'creates',
            'read' => 'reads',
            'update' => 'updates',
            'delete' => 'deletes',
        ]);
    }
}
