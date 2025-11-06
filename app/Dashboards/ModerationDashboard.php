<?php

namespace App\Dashboards;

class ModerationDashboard extends Dashboard
{
    public static array $links = [
        'moderation.home' => [
            'title' => 'Home',
            'component' => 'Dashboards/Moderation/Home',
            'description' => 'Moderation dashboard',
            'icon' => 'home'
        ],
        'moderation.reports.index' => [
            'title' => 'Reports',
            'component' => 'Dashboards/Moderation/Reports/Index',
            'description' => 'View reports',
            'icon' => 'shield-exclamation'
        ],
        'moderation.reports.show' => [
            'title' => 'Report',
            'component' => 'Dashboards/Moderation/Reports/Show',
            'description' => 'View report',
            'hidden' => true
        ],
        'moderation.bans.index' => [
            'title' => 'Bans',
            'component' => 'Dashboards/Moderation/Bans/Index',
            'description' => 'View bans',
            'icon' => 'scale'
        ],
        'moderation.ip.index' => [
            'title' => 'IP Tools',
            'component' => 'Dashboards/Moderation/IP/Index',
            'description' => 'IP Tools',
            'icon' => 'finger-print'
        ],
    ];

    public static string $title = 'Moderation';
    public static string $homeRoute = 'moderation.home';
}
