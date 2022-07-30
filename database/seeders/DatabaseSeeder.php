<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'name' => 'Spellslave',
            'email' => 'spellslave@proton.me',
        ]);

        \App\Models\User::factory(20)->create();
        \App\Models\Level::factory(10)->create();
        \App\Models\Review::factory(100)->create();

        $levels = \App\Models\Level::with('reviews')->get();
        $levels->each(function ($level, $i) {
            $count = 0;
            $total_gameplay = 0;
            $total_difficulty = 0;
            $total_visuals = 0;
            $total_overall = 0;
            foreach ($level->reviews as $review) {
                $count++;
                $total_gameplay += $review->rating_gameplay;
                $total_difficulty += $review->rating_difficulty;
                $total_visuals += $review->rating_visuals;
                $total_overall += $review->rating_overall;
            }
            if ($count >= 20) {
                $level->rating_gameplay = $total_gameplay / $count;
                $level->rating_difficulty = $total_difficulty / $count;
                $level->rating_visuals = $total_visuals / $count;
                $level->rating_overall = $total_overall / $count;
                $level->save();
            }
        });
    }
}
