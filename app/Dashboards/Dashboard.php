<?php

namespace App\Dashboards;

use App\PageBuilder;

abstract class Dashboard
{
    public static array $links = [];
    public static string $title = 'Something Broke';
    public static string $homeRoute = 'home';

    public static function page(string $route, array $props = []): PageBuilder
    {
        if (!array_key_exists($route, static::$links)) abort(500, 'The ' . static::$title . ' dashboard does not contain the route ' . $route);

        $current = static::$links[$route];

        return page($current['component'], [
            ...$props,
            '__meta_links' => static::$links,
            '__meta_layout' => 'dashboard',
        ])
            ->meta($current['title'], $current['description'], static::$homeRoute !== $route)
            ->breadcrumbs([
                crumb(static::$title, route(static::$homeRoute))
            ]);
    }
}
