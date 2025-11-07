<?php

namespace App;

class Wiki
{
    public static array $namespaces = [
        // Standard
        'Page' => 0,

        // Functional
        'Special' => 1,

        // Meta
        'Wiki' => 2,
        'Help' => 3,

        // Dictionary
        'Term' => 10,

        // Guide
        'Book' => 11,

        // DB Backed
        'Level' => 20,
        'Profile' => 21,
        'Tag' => 22,
    ];

    public static string $defaultNamespace = 'Page';

    public static array $languages = [
        'en' => 0,
        'es' => 1,
        'ru' => 2,
        'ko' => 3,
    ];

    public static string $defaultLang = 'en';

    public static string $mainPage = 'Home';


}
