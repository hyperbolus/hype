<?php

namespace App\Models\Content;

use App\Models\Games\GeometryDash\Level;
use App\Models\IdeHelperLevelTag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperLevelTag
 */
class CrowdTag extends Model
{
    use HasFactory;

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class)->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->withTimestamps();
    }
}
