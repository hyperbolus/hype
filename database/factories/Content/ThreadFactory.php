<?php

namespace Database\Factories\Content;

use App\Models\Content\Forum;
use App\Models\Content\Post;
use App\Models\Content\Thread;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Thread>
 */
class ThreadFactory extends Factory
{
    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure(): static
    {
        return $this->afterMaking(function (Thread $thread) {
            //
        })->afterCreating(function (Thread $thread) {
            Post::factory(fake()->numberBetween(0, 10))->create([
                'forum_id' => $thread->forum_id,
                'author_id' => User::query()->inRandomOrder()->first(),
            ]);
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
            'title' => fake()->words(asText: true),
            'author_id' => User::query()->inRandomOrder()->first(),
            'forum_id' => Forum::query()->whereNot('parent_id', '=', 'NULL')->inRandomOrder()->first(),
            'views' => fake()->numberBetween(0, 2500),

        ];
    }
}
