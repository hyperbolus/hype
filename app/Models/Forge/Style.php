<?php

namespace App\Models\Forge;

use App\Models\Content\Tag;
use App\Models\Media;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * @mixin IdeHelperStyle
 */
class Style extends Model
{
    use HasFactory;

    public function files(): MorphMany {
        return $this->morphMany(Media::class, 'owner');
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->withPivot(['verified', 'score'])->orderByPivot('verified', 'DESC')->orderByPivot('score', 'DESC')->withTimestamps();
    }
}
