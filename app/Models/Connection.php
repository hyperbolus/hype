<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperConnection
 */
class Connection extends Model
{
    use HasFactory;

    protected $hidden = [
        'data',
        'refresh',
        'token',
        'token_expires_at',
    ];
}
