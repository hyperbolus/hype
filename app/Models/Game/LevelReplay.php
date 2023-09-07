<?php

namespace App\Models\Game;

use App\Models\Media;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class LevelReplay extends Model
{
    use HasFactory;

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'submitter_id')
            ->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url']);
    }

    public function files(): MorphMany {
        return $this->morphMany(Media::class, 'owner');
    }
}
