<?php

namespace App\Mixins;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Str;

/**
 * @mixin Blueprint
 */
class StrMixin
{
    public function trimAtWord(): callable
    {
        return function (string $string, int $max): string {
            // No need to trim
            if (Str::length($string) <= $max) return $string;

            // We hard trim at length, then trim further
            $trimmed = Str::substr($string, 0, $max);

            // Heuristics are based on position of the last
            // space vs position of last character in string
            $lastSpace = strrpos($trimmed, " ");

            // If the word cut isn't less than 2/3 of the text,
            // then forget about it and just split the word
            if ($lastSpace > (Str::length($trimmed) / 3) * 2) {
                $trimmed = Str::substr($trimmed, 0, min(Str::length($trimmed), $lastSpace));
            }

            return $trimmed . '...';
        };
    }
}
