<?php

namespace App\Models\Content;

use App\Models\GeometryDash\Level;
use App\Models\IdeHelperPlaylistSubmission;
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
      'accepted' => 'boolean'
    ];

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function submitter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitter_id')->select(['id', 'name']);
    }
}