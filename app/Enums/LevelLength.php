<?php

namespace App\Enums;

enum LevelLength: int
{
    case Platformer = -1;
    case Tiny = 0;
    case Short = 1;
    case Medium = 2;
    case Long = 3;
    case XL = 4;
}
