<?php

namespace App\Policies;

use App\Models\Content\Review;
use App\Models\System\User;

class ReviewPolicy
{
    public function destroy(User $user, Review $review): bool
    {
        return $user->id === $review->user_id;
    }
}
