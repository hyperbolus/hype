<?php

namespace App\Models\Game;

use App\Models\Games\Dash\IdeHelperLevelReplay;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperLevelReplay
 */
class LevelReplay extends Model
{
    use HasFactory;
}
