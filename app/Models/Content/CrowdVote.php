<?php

namespace App\Models\Content;

use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperCrowdVote
 */
class CrowdVote extends Model
{
    use HasFactory;

    public function voter()
    {
        return $this->belongsTo(User::class);
    }

    public function votable()
    {
        $this->morphTo();
    }

    public function related()
    {
        $this->morphTo();
    }
}
