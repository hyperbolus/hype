<?php

namespace App\Models\System;

use App\Models\IdeHelperDraft;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperDraft
 */
class Draft extends Model
{
    use HasFactory;
}