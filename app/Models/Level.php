<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperLevel
 */
class Level extends Model
{
    use HasFactory;

    public function reviews(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Review::class, 'level_id');
    }

    public function videos(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Video::class, 'level_id');
    }

    public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(LevelTag::class)->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->orderByPivot('score', 'DESC')->withTimestamps();
    }
}
