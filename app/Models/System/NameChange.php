<?php

namespace App\Models\System;

use App\Models\IdeHelperNameChange;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperNameChange
 */
class NameChange extends Model
{
    use HasFactory;
}
