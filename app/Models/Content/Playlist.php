<?php

namespace App\Models\Content;

use App\Models\Game\Level;
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

    protected $fillable = [
        'title',
        'description',
        'owner_id',
        'visibility',
        'collaboration',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id')->select(['id', 'name', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url']);
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
