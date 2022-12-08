<?php

namespace App\Models\Social;

use App\Models\IdeHelperFriend;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperFriend
 */
class Friend extends Model
{
    use HasFactory;
}
