<?php

namespace App\Models\Forge;

use App\Models\IdeHelperModVersion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperModVersion
 */
class ModVersion extends Model
{
    use HasFactory;
}
