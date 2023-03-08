<?php

namespace App\Providers;

use App\Mixins\BlueprintMixin;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Traits\Macroable;
use ReflectionException;

class MixinServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     * @throws ReflectionException
     */
    public function register(): void
    {
        Blueprint::mixin(new BlueprintMixin); // No ide helper without this
    }
}
