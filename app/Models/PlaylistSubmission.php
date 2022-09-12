<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaylistSubmission extends Model
{
    use HasFactory;

    protected $casts = [
      'accepted' => 'boolean'
    ];

    public function level() {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function submitter() {
        return $this->belongsTo(User::class, 'submitter_id')->select(['id', 'name']);
    }
}
