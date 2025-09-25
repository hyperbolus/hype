<?php

namespace App;

use App\Rules\Password;
use Illuminate\Support\Str;
use JetBrains\PhpStorm\Pure;

class Hype
{
    public static array $flags = [
        ["Pride", "Lesbian", "Bisexual", "Transgender", "Pansexual", "Genderfluid", "NonBinary", "Agender", "Aromantic", "Intersex", "Asexual", "CSSource"],
        ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "CD", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "CG", "RE", "RW", "SH", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "SR", "SZ", "TG", "TN", "UG", "TZ", "EH", "YE", "ZM", "ZW"],
        ["AI", "AG", "AR", "AW", "BS", "BB", "BQ", "BZ", "BM", "BO", "VG", "BR", "CA", "KY", "CL", "CO", "KM", "CR", "CU", "CW", "DM", "DO", "EC", "SV", "FK", "GF", "GL", "GD", "GP", "GT", "GY", "HT", "HN", "JM", "MQ", "MX", "MS", "NI", "PA", "PY", "PE", "PR", "BL", "KN", "LC", "PM", "VC", "SX", "TT", "TC", "US", "VI", "UY", "VE"],
        ["AB", "AF", "AZ", "BD", "BT", "BN", "KH", "CN", "GE", "HK", "IN", "ID", "JP", "KZ", "LA", "MO", "MY", "MV", "MN", "MM", "NP", "KP", "MP", "PW", "PG", "PH", "SG", "KR", "LK", "TW", "TJ", "TH", "TL", "TM", "VN"],
        ["AX", "AL", "AD", "AM", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FO", "FI", "FR", "DE", "GI", "GR", "GG", "HU", "IS", "IE", "IM", "IT", "JE", "XK", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "GB", "VA"],
        ["BH", "IR", "IQ", "IL", "KW", "JO", "KG", "LB", "OM", "PK", "PS", "QA", "SA", "SY", "AE", "UZ"],
        ["AS", "AU", "CX", "CC", "CK", "FJ", "PF", "GU", "KI", "MH", "FM", "NC", "NZ", "NR", "NU", "NF", "WS", "SB", "TK", "TO", "TV", "VU", "WF"],
        ["EU", "JR"]
    ];

    /**
     * The permissions that exist within the application.
     *
     * @var array
     */
    public static array $permissions = [];

    public static array $sites = [
        'soundodger' => '',
        'dash' => '',
        'impossible' => '',
        'snail' => '',
    ];

    /**
     * The default permissions that should be available to new entities.
     *
     * @var array
     */
    public static array $defaultPermissions = [];

    public static array $morphMap = [

    ];

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
