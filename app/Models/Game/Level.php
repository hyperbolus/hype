<?php

namespace App\Models\Game;

use App\Models\Content\Review;
use App\Models\Content\Tag;
use App\Models\Content\Video;
use App\Models\Games\Dash\IdeHelperLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @mixin IdeHelperLevel
 */
class Level extends Model
{
    use HasFactory;

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'level_id');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class, 'level_id');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->orderByPivot('score', 'DESC')->withTimestamps();
    }

    public function images(): HasMany
    {
        return $this->hasMany(Video::class, 'level_id')->where('id', 0);
    }
}
