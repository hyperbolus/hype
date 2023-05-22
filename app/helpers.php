<?php

function meta(string $title = null, string $description = null): array
{
    return [
        '__meta_title' => $title,
        '__meta_description' => $description,
    ];
}
