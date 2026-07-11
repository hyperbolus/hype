<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkedAccount extends Model
{
    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
