<?php

namespace App\Models\Game;

use App\Models\Content\Review;
use App\Models\Content\Tag;
use App\Models\Content\Video;
use App\Models\Game\IdeHelperLevel;
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

    protected $fillable = [
        'rating_difficulty',
        'rating_gameplay',
        'rating_visuals',
        'rating_overall'
    ];

    public function toSearchableArray(): array
    {
        return $this->toArray();
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
