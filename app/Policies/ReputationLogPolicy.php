<?php

namespace App\Policies;

use App\Models\Content\Review;
use App\Models\System\ReputationLog;
use App\Models\System\User;

class ReputationLogPolicy
{
    public function destroy(User $user, ReputationLog $rep): bool
    {
        return $user->id === $rep->sender_id || $user->hasRole(['admin', 'moderator']);
    }
}
