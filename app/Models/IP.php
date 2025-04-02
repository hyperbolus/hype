<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperIP
 */
class IP extends Model
{
    /** @use HasFactory<\Database\Factories\IPFactory> */
    use HasFactory;

    protected $table = 'ips';
}
