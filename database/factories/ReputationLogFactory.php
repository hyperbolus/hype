<?php

namespace Database\Factories;

use App\Models\ReputationLog;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ReputationLog>
 */
class ReputationLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::query()->inRandomOrder()->limit(2)->get();
        return [
            'sender_id' => $users[0],
            'recipient_id' => $users[1],
            'reputation' => fake()->numberBetween(-4, 4),
            'reason' => fake()->boolean(75) ? fake()->sentence : null,
        ];
    }
}
