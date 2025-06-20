<?php

namespace App\Policies;

use App\Models\System\User;

class VideoPolicy
{
    public function destroy(User $user): bool
    {
        return $user->hasRole(['admin', 'moderator']);
    }
}
