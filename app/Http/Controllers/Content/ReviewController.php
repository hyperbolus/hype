<?php

namespace App\Http\Controllers\Content;

use App\Actions\CalculateRatings;
use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\Review;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReviewController extends Controller
{
    public function index(): Responsable
    {
        return page('Reviews/Index', [
            'reviews' => sorting(Review::class)
                ->filters()
                ->with(['author', 'level'])
                ->orderBy('id')
                ->paginatorOptions(10, 1, 30)
                ->paginate(),
            'sorting' => sorting(Review::class)->filters()
        ])->meta('Level Reviews', 'Hear the latest thoughts on levels');
    }

    public function create(Request $request)
    {
        $level = Hydrate::level($request->integer('level'));

        abort_if(!$level, 404, 'Level could not be found');

        return page('Reviews/Create', [
            'level' => $level,
            'review' => Review::query()
                ->where('level_id', $level->id)
                ->where('user_id', $request->user()->id)
                ->first(),
        ])->meta('Write a New Review', 'Rate a level & write a review', false)
            ->breadcrumbs([
                crumb('Reviews', route('reviews.index')),
                crumb('New', route('reviews.create', ['level' => $level->id])),
            ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $level = Hydrate::level($request->integer('level'));

        if (!$level) abort(500, 'Could not fetch level');

        $request->validate([
            'rating_gameplay' => ['nullable', 'integer', 'between:0,10'],
            'rating_visuals' => ['nullable', 'integer', 'between:0,10'],
            'rating_overall' => ['required', 'integer', 'between:0,10'],
            'body' => ['nullable', 'string', 'min:20']
        ]);

        // TODO: I think this should be moved to update or something
        Review::query()->updateOrCreate([
            'level_id' => $level->id,
            'user_id' => $request->user()->id,
        ], [
            'rating_difficulty' => null,
            'rating_gameplay' => $request->input('rating_gameplay'),
            'rating_visuals' => $request->input('rating_visuals'),
            'rating_overall' => $request->input('rating_overall'),
            'review' => $request->string('body'),
        ]);

        $level->loadCount('reviews');

        CalculateRatings::level($level);
        CalculateRatings::rankings(true);

        return redirect()->back();
    }

    public function show(Review $review)
    {
        return page('Reviews/Show', [
            'review' => $review->load(['level', 'author'])
        ])->meta($review->author->name . '\'s Review of ' . $review->level->name, Str::trimAtWord($review->review ?? 'User has not left a written review', 150));
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
        CalculateRatings::rankings(true);

        return back();
    }
}
