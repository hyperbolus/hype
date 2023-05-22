<?php

namespace App\Features;

use Illuminate\Support\Lottery;

class ImpossibleGame
{
    /**
     * Resolve the feature's initial value.
     */
    public function resolve(mixed $scope): mixed
    {
        return false;
    }
}
