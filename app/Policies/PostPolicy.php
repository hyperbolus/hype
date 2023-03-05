<?php

namespace App\Policies;

use App\Models\Content\Post;
use App\Models\System\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;

    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->author_id;
    }
}
