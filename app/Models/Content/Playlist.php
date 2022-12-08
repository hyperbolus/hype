<?php

namespace App\Models\Content;

use App\Models\GeometryDash\Level;
use App\Models\IdeHelperPlaylist;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperPlaylist
 */
class Playlist extends Model
{
    use HasFactory;

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id')->select(['id', 'name']);
    }

    public function levels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class, 'playlist_submissions', 'playlist_id', 'level_id');
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(PlaylistSubmission::class, 'playlist_id')->with(['level', 'submitter']);
    }
}
