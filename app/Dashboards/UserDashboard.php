<?php

namespace App\Dashboards;

class UserDashboard extends Dashboard
{
    public static array $links = [
        'settings.home' => [
            'title' => 'Home',
            'component' => 'Dashboards/User/Home',
            'description' => 'Hype admin control panel',
            'icon' => 'home'
        ],
        'settings.profile' => [
            'title' => 'Profile',
            'component' => 'Dashboards/User/Profile',
            'description' => 'Customize your user profile',
            'icon' => 'user-circle'
        ],
        'settings.relationships' => [
            'title' => 'Relationships',
            'component' => 'Dashboards/User/Relationships',
            'description' => 'Manage your user relationships',
            'icon' => 'users'
        ],
        'settings.account' => [
            'title' => 'Account',
            'component' => 'Dashboards/User/Account',
            'description' => 'Manage your account settings',
            'icon' => 'cog'
        ],
    ];

    public static string $title = 'Settings';
    public static string $homeRoute = 'settings.home';
}
