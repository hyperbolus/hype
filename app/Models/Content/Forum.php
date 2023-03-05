<?php

namespace App\Models\Content;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @mixin IdeHelperForum
 */
class Forum extends Model
{
    use HasFactory;
    use Sluggable;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }

    protected $table = 'forums';

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Forum::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Forum::class, 'parent_id');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class, 'forum_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'forum_id');
    }

    public function lastPost(): HasOne
    {
        // TODO: Investigate why ->limit(1) is required if hasOne uses ->first()
        return $this->hasOne(Post::class)->orderByDesc('id')->limit(1)->with('thread');
    }
}
