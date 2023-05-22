<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSetting
 */
class Setting extends Model
{
    use HasFactory;

    protected $casts = [
        'site' => 'integer',
        'type' => 'integer',
    ];
}
