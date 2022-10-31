<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperProfileComment
 */
class ProfileComment extends Model
{
    use HasFactory;

    public function commenter() {
        return $this->belongsTo(User::class, 'commenter_id')->select(['id', 'name']);
    }
}
