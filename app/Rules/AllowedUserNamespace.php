<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AllowedUserNamespace implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        if (in_array(strtolower($value), json_decode(file_get_contents(app_path() . "/banned_names.json"), true))) {
            $fail('This is a reserved username. Please contact an admin if you think this is an error.');
        }
    }
}
