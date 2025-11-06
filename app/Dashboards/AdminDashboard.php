<?php

namespace App\Dashboards;

class AdminDashboard extends Dashboard
{
    public static array $links = [
        'system.home' => [
            'title' => 'Home',
            'component' => 'Dashboards/Admin/Home',
            'description' => 'Hype admin control panel',
            'icon' => 'home'
        ],
        'system.settings' => [
            'title' => 'Settings',
            'component' => 'Dashboards/Admin/Settings',
            'description' => 'Home page',
            'icon' => 'cog'
        ],
        'system.users' => [
            'title' => 'Users',
            'component' => 'Dashboards/Admin/Users',
            'description' => 'Home page',
            'icon' => 'users'
        ],
        'system.forums' => [
            'title' => 'Forums',
            'component' => 'Dashboards/Admin/Forums',
            'description' => 'Home page',
            'icon' => 'chat-bubble-left-right'
        ],
        'system.scripts' => [
            'title' => 'Scripts',
            'component' => 'Dashboards/Admin/Scripts',
            'description' => 'Home page',
            'icon' => 'command-line'
        ],
    ];

    public static string $title = 'Admin';
    public static string $homeRoute = 'system.home';
}
