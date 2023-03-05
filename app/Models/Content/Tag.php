<?php

namespace App\Models\Content;

use App\Models\Game\Level;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @mixin IdeHelperTag
 */
class Tag extends Model
{
    use HasFactory;

    public function votes(): MorphMany
    {
        return $this->morphMany(CrowdVote::class, 'votable');
    }

    public function levels(): MorphToMany
    {
        return $this->morphedByMany(Level::class, 'taggable')->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->withTimestamps();
    }
}
