<?php

namespace App\Models\Content;

use App\Models\Game\Level;
use App\Models\WikiPage;
use App\Wiki;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @mixin IdeHelperTag
 */
class Tag extends Model
{
    public function votes(): MorphMany
    {
        return $this->morphMany(CrowdVote::class, 'votable');
    }

    public function levels(): MorphToMany
    {
        return $this->morphedByMany(Level::class, 'taggable')->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->withTimestamps();
    }

    public function wikiPage(): BelongsTo
    {
        return $this->belongsTo(WikiPage::class, 'id', 'title')->where('namespace', Wiki::$namespaces['Tag']);
    }
}
