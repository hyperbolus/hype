<?php

namespace Database\Factories;

use App\Models\Level;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rating_gameplay' => fake()->numberBetween(0, 10),
            'rating_difficulty' => fake()->numberBetween(0, 10),
            'rating_visuals' => fake()->numberBetween(0, 10),
            'rating_overall' => fake()->numberBetween(0, 10),
            'review' => fake()->sentences(asText: true),
            'user_id' => User::query()->inRandomOrder()->first(),
            'level_id' => Level::query()->inRandomOrder()->first(),
        ];
    }
}
