<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperProfileComment
 */
class ProfileComment extends Model
{
    use HasFactory;

    public function commenter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commenter_id')->select(['id', 'name']);
    }
}
