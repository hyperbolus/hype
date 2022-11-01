<?php

namespace App\Http\Controllers;

use App\Actions\Hydrate;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request): RedirectResponse
    {
        // TODO: validate types and values of ratings
        $level = Hydrate::level($request->integer('level_id'));

        if($level->reviews_count >= 5) {
            if($level->rating_overall === null) {
                $total_gameplay = 0;
                $total_difficulty = 0;
                $total_visuals = 0;
                $total_overall = 0;
                foreach ($level->reviews as $review) {
                    $total_gameplay += $review->rating_gameplay;
                    $total_difficulty += $review->rating_difficulty;
                    $total_visuals += $review->rating_visuals;
                    $total_overall += $review->rating_overall;
                }
                $level->rating_gameplay = $total_gameplay / $level->reviews_count;
                $level->rating_difficulty = $total_difficulty / $level->reviews_count;
                $level->rating_visuals = $total_visuals / $level->reviews_count;
                $level->rating_overall = $total_overall / $level->reviews_count;
            } else {
                // Faster algorithm if ratings have been calculated before
                $level->rating_gameplay = (($level->rating_gameplay * $level->reviews_count) + $request->integer('rating_gameplay')) / ($level->reviews_count + 1);
                $level->rating_visuals = (($level->rating_visuals * $level->reviews_count) + $request->integer('rating_visuals')) / ($level->reviews_count + 1);
                $level->rating_difficulty = (($level->rating_difficulty * $level->reviews_count) + $request->integer('rating_difficulty')) / ($level->reviews_count + 1);
                $level->rating_overall = (($level->rating_overall * $level->reviews_count) + $request->integer('rating_overall')) / ($level->reviews_count + 1);
            }
            $level->save();
        }

        Review::query()->updateOrCreate([
            'level_id' => $request->integer('level_id'),
            'user_id' => $request->user()->id
        ], [
            'rating_difficulty' => max(0, min(10, $request->integer('rating_difficulty'))),
            'rating_gameplay' => max(0, min(10, $request->integer('rating_gameplay'))),
            'rating_visuals' => max(0, min(10, $request->integer('rating_visuals'))),
            'rating_overall' => max(0, min(10, $request->integer('rating_overall'))),
            'review' => $request->string('body'),
            ]);

        return redirect()->back();
    }

    public function show(Review $review)
    {
        //
    }

    public function edit(Review $review)
    {
        //
    }

    public function update(Request $request, Review $review)
    {
        //
    }

    public function destroy(Review $review)
    {
        //
    }
}
