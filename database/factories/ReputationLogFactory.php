<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReputationLog>
 */
class ReputationLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'sender_id' => fake()->numberBetween(1, 20),
            'recipient_id' => fake()->numberBetween(1, 20),
            'reputation' => fake()->numberBetween(-4, 4),
            'reason' => fake()->boolean(75) ? fake()->sentence : null,
        ];
    }
}
