<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class FileExt implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // TODO: Add something that fails or warns if extension has a better MIME validator
        in_array($value, [...$attribute]);
    }
}
