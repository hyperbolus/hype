<?php

namespace App\Enums;

enum OAuthPlatform: int
{
    case Patreon = 1;
    case Twitter = 2;
    case Discord = 3;
    case GeometryDash = 4;
}
