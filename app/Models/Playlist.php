<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;

    public function owner(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id')->select(['id', 'name']);
    }

    public function levels() {
        return $this->belongsToMany(Level::class, 'playlist_submissions', 'level_id', 'playlist_id');
    }

    public function submissions() {
        return $this->hasMany(PlaylistSubmission::class, 'playlist_id')->with(['level', 'submitter']);
    }
}
