<?php

namespace App\Enums;

enum RelationshipType: int
{
    case Block = 4;
    case Mute = 3;
    case Friend = 1;
    case Enemy = 2;
}
