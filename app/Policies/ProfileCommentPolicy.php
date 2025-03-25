<?php

namespace App\Policies;

use App\Models\System\ProfileComment;
use App\Models\System\User;

class ProfileCommentPolicy
{
    public function destroy(User $user, ProfileComment $comment): bool
    {
        return $user->id === $comment->user_id || $user->id === $comment->commenter_id || $user->hasRole(['admin', 'moderator']);
    }
}
