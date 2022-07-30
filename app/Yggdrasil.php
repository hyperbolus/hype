<?php

namespace App;

use App\Rules\Password;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\Pure;

class Yggdrasil
{

    /**
     * The permissions that exist within the application.
     *
     * @var array
     */
    public static array $permissions = [];

    /**
     * The default permissions that should be available to new entities.
     *
     * @var array
     */
    public static array $defaultPermissions = [];

    /**
     * Generate a new 2fa recovery code.
     *
     * @return string
     */
    public static function generateRecoveryCode(): string
    {
        return Str::random(10).'-'.Str::random(10);
    }

    /**
     * Get the validation rules used to validate passwords.
     *
     * @return array
     */
    #[Pure]
    public static function passwordRules(): array
    {
        return ['required', 'string', new Password, 'confirmed'];
    }

    /**
     * Determine if any permissions have been registered with Jetstream.
     *
     * @return bool
     */
    public static function hasPermissions(): bool
    {
        return count(static::$permissions) > 0;
    }

    /**
     * Define the available API token permissions.
     *
     * @param  array  $permissions
     * @return static
     */
    public static function permissions(array $permissions): static
    {
        static::$permissions = $permissions;

        return new static;
    }

    /**
     * Define the default permissions that should be available to new API tokens.
     *
     * @param  array  $permissions
     * @return static
     */
    public static function defaultApiTokenPermissions(array $permissions): static
    {
        static::$defaultPermissions = $permissions;

        return new static;
    }

    /**
     * Return the permissions in the given list that are actually defined permissions for the application.
     *
     * @param  array  $permissions
     * @return array
     */
    public static function validPermissions(array $permissions): array
    {
        return array_values(array_intersect($permissions, static::$permissions));
    }
}
