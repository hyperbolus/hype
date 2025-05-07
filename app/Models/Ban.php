<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperIP
 */
class Ban extends Model
{
    public function creator(): MorphTo
    {
        return $this->morphTo('created_by');
    }

    public function bannable(): MorphTo
    {
        return $this->morphTo();
    }
}
