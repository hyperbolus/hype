<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlaylistSubmission>
 */
class PlaylistSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'level_id' => fake()->numberBetween(1, 10),
            'playlist_id' => fake()->numberBetween(1, 5),
            'server_id' => 0,
            'review_id' => fake()->numberBetween(1, 100),
            'submitter_id' => fake()->numberBetween(1, 20),
            'accepted' => true
        ];
    }
}
