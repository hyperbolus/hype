<?php

namespace App\Models\Content;

use App\Models\Media;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin IdeHelperPost
 */
class Post extends Model
{
    use HasFactory;

    protected $casts = [
        'rich' => 'boolean',
        'signature' => 'boolean',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'ip',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id')
            ->select(['id', 'name', 'flag', 'primary_group_id', 'signature_visibility', 'created_at', 'reputation', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'postbit_url', 'signature'])
            ->withCount('posts');
    }

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }

    public function media(): MorphMany
    {
        return $this->morphMany(Media::class, 'owner');
    }
}
