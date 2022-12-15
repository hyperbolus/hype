<?php

namespace App\Models\Games\GeometryDash;

use App\Models\Content\CrowdTag;
use App\Models\Content\Review;
use App\Models\Content\Video;
use App\Models\IdeHelperLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(CrowdTag::class)->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->orderByPivot('score', 'DESC')->withTimestamps();
    }

    public function images(): HasMany
    {
        return $this->hasMany(Video::class, 'level_id')->where('id', 0);
    }
}
