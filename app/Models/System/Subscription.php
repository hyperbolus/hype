<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperSubscription
 */
class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'subscriber_id',
        'subscribable_id',
        'subscribable_type',
        'email'
    ];

    protected $casts = [
      'email' => 'boolean'
    ];
}
