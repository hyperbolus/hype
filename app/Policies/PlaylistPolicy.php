<?php

namespace App\Policies;

use App\Models\Content\Playlist;
use App\Models\System\User;

class PlaylistPolicy
{
    public function edit(User $user, Playlist $playlist): bool
    {
        return $user->id === $playlist->owner_id;
    }
}
