<?php

namespace App\Actions;

use App\Models\System\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class Setup
{
    public static function all($version) {
        self::permissions($version);
        self::users($version);
    }

    public static function permissions($version)
    {
        if($version < 1) {
            Role::create(['name' => 'admin']);
            Role::create(['name' => 'moderator']);
            Role::create(['name' => 'writer']);
        }
    }

    public static function users($version) {
        if ($version < 1) {
            User::create([
                'id' => 0,
                'name' => 'System',
                'email' => 'noreply@gdforums.com',
                'password' => Hash::make(Str::random()),
            ]);

            User::create([
                'id' => 1,
                'name' => 'Admin',
                'email' => 'admin@gdforums.com',
                'password' => '$2y$10$hIclTmDoDXbEO.06mcUbgOE4Tv3BkQyRvXlv9MKArbQv2xWJzwj02', // password
            ])->assignRole('admin');
        }
    }
}
