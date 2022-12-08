<?php

namespace Database\Factories;

use App\Models\Content\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterMaking(function (Post $user) {
            //
        })->afterCreating(function (Post $user) {
            //
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'thread_id' => fake()->numberBetween(1, 10),
            'author_id' => fake()->numberBetween(1, 20),
            'body' => fake()->paragraph
        ];
    }
}
