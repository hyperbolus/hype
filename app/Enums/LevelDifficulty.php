<?php

namespace App\Enums;

enum LevelDifficulty: int
{
    case Unrated = 0;
    case Auto = 1;
    case Easy = 2;
    case Normal = 3;
    case Hard = 4;
    case Harder = 5;
    case Insane = 6;
    case EasyDemon = 7;
    case MediumDemon = 8;
    case HardDemon = 9;
    case InsaneDemon = 10;
    case ExtremeDemon = 11;

    public function isDemon(): bool
    {
        return in_array($this, [
            self::EasyDemon,
            self::MediumDemon,
            self::HardDemon,
            self::InsaneDemon,
            self::ExtremeDemon,
        ]);
    }
}
