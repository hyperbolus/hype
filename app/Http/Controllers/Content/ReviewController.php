<?php

namespace App\Http\Controllers\Content;

use App\Actions\CalculateRatings;
use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\Review;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            'rating_gameplay' => ['nullable', 'integer', 'between:0,10'],
            'rating_visuals' => ['nullable', 'integer', 'between:0,10'],
            'rating_difficulty' => ['nullable', 'integer', 'between:0,100'],
            'rating_overall' => ['required', 'integer', 'between:0,10'],
            'body' => ['nullable', 'string', 'min:20']
        ]);

        // TODO: I think this should be moved to update or something
        Review::query()->updateOrCreate([
            'level_id' => $request->integer('level_id'),
            'user_id' => $request->user()->id,
        ], [
            'rating_difficulty' => $request->input('rating_difficulty'),
            'rating_gameplay' => $request->input('rating_gameplay'),
            'rating_visuals' => $request->input('rating_visuals'),
            'rating_overall' => $request->input('rating_overall'),
            'review' => $request->string('body'),
        ]);

        $level->loadCount('reviews');

        CalculateRatings::level($level);

        return redirect()->back();
    }

    public function show(Review $review)
    {
        return page('Reviews/Show', [
            'review' => $review->load(['level', 'author'])
        ])->meta($review->author->name . '\'s Review of ' . $review->level->name, Str::trimAtWord($review->review, 150));
    }

    public function edit(Review $review)
    {
        //
    }

    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy(Review $review): RedirectResponse
    {
        $this->authorize('destroy', $review);
        $review->load('level');
        $level = $review->level;
        $review->forceDelete();
        CalculateRatings::level($level);

        return back();
    }
}
