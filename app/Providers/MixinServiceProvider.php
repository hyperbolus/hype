<?php

namespace App\Providers;

use App\Mixins\BlueprintMixin;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Traits\Macroable;
use ReflectionException;

class MixinServiceProvider extends ServiceProvider
{
    protected array $mixins = [
        Blueprint::class => BlueprintMixin::class
    ];

    /**
     * Register any application services.
     *
     * @return void
     * @throws ReflectionException
     */
    public function register(): void
    {
//        foreach ($this->mixins as $class => $mixin) {
//            /**
//             * @var Macroable $class
//             */
//            $class::mixin(new $mixin);
//        }
        Blueprint::mixin(new BlueprintMixin()); // No ide helper without this, maybe l8r :\
    }
}
