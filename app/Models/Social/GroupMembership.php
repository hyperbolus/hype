<?php

namespace App\Models\Social;

use App\Models\IdeHelperGroupMembership;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperGroupMembership
 */
class GroupMembership extends Model
{
    use HasFactory;
}
