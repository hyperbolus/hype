<?php

namespace App\Models\Game;

use App\Models\Media;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin IdeHelperLevelReplay
 */
class LevelReplay extends Model
{
    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitter_id');
    }

    public function files(): MorphMany {
        return $this->morphMany(Media::class, 'owner');
    }
}
