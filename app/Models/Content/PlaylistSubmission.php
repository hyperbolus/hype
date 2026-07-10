<?php

namespace App\Models\Content;

use App\Models\Game\Level;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperPlaylistSubmission
 */
class PlaylistSubmission extends Model
{
    use HasFactory;

    protected $casts = [
        'accepted' => 'boolean',
    ];

    protected $fillable = [
        'rank',
    ];

    public function playlist(): BelongsTo
    {
        return $this->belongsTo(Playlist::class, 'playlist_id');
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id')->withCount(['reviews']);
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitter_id');
    }
}
