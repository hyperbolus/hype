<?php

namespace Database\Factories\System;

use App\Models\System\Message;
use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::query()->inRandomOrder()->limit(2)->get();

        return [
            'sender_id' => $users[0],
            'recipient_id' => $users[1],
            'body' => fake()->paragraph(),
            'read_at' => fake()->boolean ? now() : null,
        ];
    }
}
