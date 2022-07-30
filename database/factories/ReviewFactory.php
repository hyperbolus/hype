<?php

namespace Database\Factories;

use App\Models\Level;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'rating_gameplay' => random_int(0, 10),
            'rating_difficulty' => random_int(0, 10),
            'rating_visuals' => random_int(0, 10),
            'rating_overall' => random_int(0, 10),
            'review' => fake()->sentences(asText: true),
            'user_id' => User::inRandomOrder()->first(),
            'level_id' => Level::inRandomOrder()->first(),
        ];
    }
}
