<?php

namespace Database\Factories\Game;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game\Level>
 */
class LevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->words(2, true),
            'creator' => fake()->userName,
            'description' => fake()->sentences(2, true),
        ];
    }
}
