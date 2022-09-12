<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostLike extends Model
{
    use HasFactory;

    public function post() {
        return $this->belongsTo(Post::class, 'post_id')->select(['id']);
    }

    public function liker() {
        return $this->belongsTo(User::class, 'liker_id')->select(['id', 'name']);
    }
}
