<?php

namespace App\Console\Commands;

use App\Models\Game\Level;
use Illuminate\Console\Command;

class CalculateRatings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:ratings:calculate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recalculates average level ratings';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $levels = Level::all();
        $levels->load('reviews');
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
            if ($count >= 5) {
                $level->rating_gameplay = $total_gameplay / $count;
                $level->rating_difficulty = $total_difficulty / $count;
                $level->rating_visuals = $total_visuals / $count;
                $level->rating_overall = $total_overall / $count;
            } else {
                $level->rating_gameplay = null;
                $level->rating_difficulty = null;
                $level->rating_visuals = null;
                $level->rating_overall = null;
            }
            $level->save();
        });
    }
}
