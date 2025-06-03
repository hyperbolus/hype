<?php

namespace App\Actions;

use App\Models\System\ReputationLog;
use App\Models\System\User;

class CalculateReputation
{
    public static function all(): void
    {
        User::withoutTimestamps(function () {
            User::query()->update([
                'reputation' => 0
            ]);
        });

        $users = User::query()
            ->select('id')
            ->whereHas('reputation')
            ->get();

        $reps = ReputationLog::query()
            ->select(['id', 'recipient_id', 'sender_id', 'reputation'])
            ->whereHas('sender', function ($q) {
                $q->whereNull('banned_at');
            })
            ->get()
            ->mapToGroups(fn (ReputationLog $rep) => [$rep->recipient_id => $rep]);

        $updates = [];

        $users->map(function (User $user) use (&$updates, &$reps) {
            if (!$reps->has($user->id)) return;

            $updates[] = [
                'id' => $user->id,
                'reputation' => $reps[$user->id]->sum('reputation'),
            ];
        });

        User::withoutTimestamps(function () use (&$updates) {
            User::query()->upsert(
                $updates,
                'id',
                ['reputation']
            );
        });
    }
}
