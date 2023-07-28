<?php

namespace App\Http\Controllers\Content;

use App\Actions\CalculateRatings;
use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $level = Hydrate::level($request->integer('level_id'));

        $request->validate([
            'rating_gameplay' => 'nullable|integer|between:0,10',
            'rating_visuals' => 'nullable|integer|between:0,10',
            'rating_difficulty' => 'nullable|integer|between:0,100',
            'rating_overall' => 'required|integer|between:0,10',
            'body' => 'required|min:20'
        ]);

        // TODO: I think this should be moved to update or something
        Review::query()->updateOrCreate([
            'level_id' => $request->integer('level_id'),
            'user_id' => $request->user()->id,
        ], [
            'rating_difficulty' => $request->integer('rating_difficulty'),
            'rating_gameplay' => $request->integer('rating_gameplay'),
            'rating_visuals' => $request->integer('rating_visuals'),
            'rating_overall' => $request->integer('rating_overall'),
            'review' => $request->string('body'),
        ]);

        $level->loadCount('reviews');

        CalculateRatings::level($level);

        return redirect()->back();
    }

    public function show(Review $review)
    {
        return Inertia::render('Reviews/Show', [
            'review' => $review->load(['level', 'author'])
        ]);
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
