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
    public function commenter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commenter_id')->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'banned_at', 'premium_expires_at']);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'banned_at', 'premium_expires_at']);
    }
}
