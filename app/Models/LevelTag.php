<?php

namespace App\Models;

use App\Models\GeometryDash\Level;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperLevelTag
 */
class LevelTag extends Model
{
    use HasFactory;

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class)->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->withTimestamps();
    }
}
