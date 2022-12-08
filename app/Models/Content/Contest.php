<?php

namespace App\Models\Content;

use App\Models\IdeHelperContest;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperContest
 */
class Contest extends Model
{
    use HasFactory;

    public function hosts() {
        return $this->hasManyThrough(User::class, ContestRole::class, 'assignee_id', 'contest_id');
    }
}
