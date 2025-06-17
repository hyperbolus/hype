<?php

namespace App\Models\Game;

use App\Models\Content\Review;
use App\Models\Content\Tag;
use App\Models\Content\Video;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;

/**
 * @mixin IdeHelperLevel
 */
class Level extends Model
{
    use HasFactory;
    use Searchable;
    use Sortable;

    protected $fillable = [
        'rating_difficulty',
        'rating_gameplay',
        'rating_visuals',
        'rating_overall'
    ];

    protected $casts = [
        'last_fetched_at' => 'datetime',
    ];

    public function getSortableAttributes(): array
    {
        return [
            'id',
            'rating_overall',
            'rating_gameplay',
            'rating_visuals',
            'rating_difficulty',
            'reviews_count',
            'created_at',
        ];
    }

    public function toSearchableArray(): array
    {
        return $this->toArray();
    }

    public function ratingsOnly(): HasMany
    {
        return $this->hasMany(Review::class, 'level_id')->where(function ($q) {
            $q->whereNull('review')->orWhere('review', '');
        });
    }

    public function reviewsOnly(): HasMany
    {
        return $this->hasMany(Review::class, 'level_id')->whereNotNull('review')->whereNot('review', '');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'level_id');
    }

    public function replays(): HasMany
    {
        return $this->hasMany(LevelReplay::class, 'level_id')->orderBy('approved_at', 'DESC');
    }

    public function approvedReplays(): HasMany
    {
        return $this->hasMany(LevelReplay::class, 'level_id')->whereNotNull('approved_at');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class, 'level_id');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->orderByPivot('score', 'DESC')->withTimestamps();
    }
    public function topTags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')
            ->withPivot(['verified', 'score'])
            ->orderByPivot('verified', 'DESC')
            ->orderByPivot('score', 'DESC')
            ->withTimestamps()
            ->where('score', '>', 0.5)
            ->orWhere('verified', true);
    }


    public function images(): HasMany
    {
        return $this->hasMany(Video::class, 'level_id')->where('id', 0);
    }
}
