<?php

namespace App\Models\Game;

use App\Models\Games\Dash\IdeHelperProfile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperProfile
 */
class Profile extends Model
{
    use HasFactory;
}
