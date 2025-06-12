<?php

namespace App\Policies;

use App\Models\Content\Playlist;
use App\Models\System\User;

class PlaylistSubmissionPolicy
{
    public function create(?User $user, Playlist $playlist): bool
    {
        return match ($playlist->collaboration) {
            'public' => true,
            'invite' => false,
            'none' => $user?->id === $playlist->owner_id,
            default => false,
        };

    }

    public function destroy(User $user, Playlist $playlist): bool
    {
        return $user->id === $playlist->owner_id;

    }
}
