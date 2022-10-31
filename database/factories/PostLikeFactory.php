<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\PostLike;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PostLike>
 */
class PostLikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $combos = [];
        for ($i = 11; $i <= User::query()->count(); $i++) {
            for ($j = 1; $j <= Post::query()->count(); $j++) {
                $combos[] = [$i, $j];
            }
        }

        $selection = fake()->unique()->randomElement($combos);
        return [
            'post_id' => $selection[1],
            'liker_id' => $selection[0]
        ];
    }
}
