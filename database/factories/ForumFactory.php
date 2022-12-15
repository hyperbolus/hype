<?php

namespace Database\Factories;

use App\Models\Content\Forum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Forum>
 */
class ForumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(asText: true),
            'description' => fake()->sentence,
            'parent_id' => Forum::query()->inRandomOrder()->first()
        ];
    }
}
