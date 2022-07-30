<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $level = Level::where('id', '=', $request->level_id)->withCount('reviews')->first();

        if($level === null) {
            return response('Level Not Found', 400);
        }

        if($level->reviews_count >= 20) {
            if($level->overall_gameplay === null) {
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
                $level->rating_gameplay = (($level->rating_gameplay * $level->reviews_count) + $request->rating_gameplay) / ($level->reviews_count + 1);
                $level->rating_visuals = (($level->rating_visuals * $level->reviews_count) + $request->rating_visuals) / ($level->reviews_count + 1);
                $level->rating_difficulty = (($level->rating_difficulty * $level->reviews_count) + $request->rating_difficulty) / ($level->reviews_count + 1);
                $level->rating_overall = (($level->rating_overall * $level->reviews_count) + $request->rating_overall) / ($level->reviews_count + 1);
            }
            $level->save();
        }

        $review = Review::updateOrCreate([
            'level_id' => $request->level_id,
            'user_id' => $request->user()->id
        ], [
            'rating_difficulty' => $request->rating_difficulty,
            'rating_gameplay' => $request->rating_gameplay,
            'rating_visuals' => $request->rating_visuals,
            'rating_overall' => $request->rating_overall,
            'review' => $request->body,
            ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
