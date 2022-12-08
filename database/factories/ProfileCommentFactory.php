<?php

namespace Database\Factories;

use App\Models\Social\ProfileComment;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProfileComment>
 */
class ProfileCommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'commenter_id' => User::query()->inRandomOrder()->first(),
            'user_id' => User::query()->inRandomOrder()->first(),
            'body' => fake()->sentences(asText: true),
        ];
    }
}
