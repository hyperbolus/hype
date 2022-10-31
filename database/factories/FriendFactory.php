<?php

namespace Database\Factories;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Friend>
 */
class FriendFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $combos = [];
        for ($i = 1; $i <= User::query()->count(); $i++) {
            for ($j = 1; $j <= User::query()->count(); $j++) {
                // can't be friends with yourself, sorry :/
                if ($i === $j) continue;
                // culls transmutated pairs while keeping directionality
                // e.g. A -> B is considered a duplicate of B -> A,
                // but either A -> B or B -> A can exist, you cannot
                // force a sort since directionality must be kept. a
                // downside is that since the iteration order is
                // deterministic, the first combination will always be
                // lost, but this is likely a non-issue for testing purposes
                $combos[min($i, $j).'-'.max($i, $j)] = [$i, $j];

            }
        }

        $selection = fake()->unique()->randomElement($combos);
        return [
            'sender_id' => $selection[0],
            'recipient_id' => $selection[1],
            'message' => fake()->sentence,
            'accepted_at' => fake()->boolean ? now() : null,
        ];
    }
}
