<?php

namespace App;

class Wiki
{
    public static array $namespaces = [
        'Page' => 0,
        'Level' => 1,
        'Profile' => 2,
        'Tag' => 3,
        'Term' => 4,
        'Book' => 5,
        'Wiki' => 6,
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
