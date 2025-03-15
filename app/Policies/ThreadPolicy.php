<?php

namespace App\Policies;

use App\Models\Content\Thread;
use App\Models\System\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ThreadPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Thread $thread): bool
    {
        return $user->id === $thread->author_id;
    }
}
