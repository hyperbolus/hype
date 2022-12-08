<?php

namespace App\Models\Social;

use App\Models\Content\Post;
use App\Models\IdeHelperPostLike;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperPostLike
 */
class PostLike extends Model
{
    use HasFactory;

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'post_id')->select(['id']);
    }

    public function liker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'liker_id')->select(['id', 'name']);
    }
}
