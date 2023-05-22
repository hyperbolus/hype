<?php

namespace App\Models;

use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model
{
    use HasFactory;

    public function owner(): BelongsTo {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
