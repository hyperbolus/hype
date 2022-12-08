<?php

namespace App\Models\Social;

use App\Models\IdeHelperProfileComment;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperProfileComment
 */
class ProfileComment extends Model
{
    use HasFactory;

    public function commenter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'commenter_id')->select(['id', 'name']);
    }
}
