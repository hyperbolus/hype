<?php

namespace App\Http\Controllers\Game;

use App\Actions\CalculateRatings;
use App\Actions\Hydrate;
use App\FilterBuilder;
use App\Http\Controllers\Controller;
use App\Models\Content\CrowdVote;
use App\Models\Content\Review;
use App\Models\Content\Tag;
use App\Models\Game\Level;
use App\Models\Game\LevelReplay;
use App\Models\Media;
use Hashids\Hashids;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Facades\Image;

class LevelController extends Controller
{
    /**
     * Display level list (light search functions)
     */
    public function index(Request $request): Response
    {

        $levels = sorting(Level::query()->withCount('reviews'), 'rating_overall');

        if (auth()->check()) {
            $user = $request->user();

            $levels->with(['reviews' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])->filters([
                'reviewed' => function (FilterBuilder $q) use ($user) {
                    $q->whereHas('reviews', function (Builder $q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                },
                'unreviewed' => function (FilterBuilder $q) use ($user) {
                    $q->whereDoesntHave('reviews', function (Builder $q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                },
                'unapproved_replays' => function (FilterBuilder $q) {
                    $q->whereHas('replays')->whereDoesntHave('approvedReplays');
                },
                'only_platformers' => function (FilterBuilder $q) {
                    $q->where('length', '-1');
                },
                'only_classic' => function (FilterBuilder $q) {
                    $q->whereNot('length', '-1');
                }
            ]);
        }

        if (in_array($request->string('sortBy'), ['rating_overall', 'rating_overall', 'rating_overall', 'rating_overall'])) {
            $levels->whereNotNull('levels.' . $request->string('sortBy'));
            $levels->orderBy('reviews_count', 'desc');
        }

        return Inertia::render('Levels/Index', [
            'levels' => $levels->orderBy('id')
                ->paginatorOptions(10, 1, 30)
                ->paginate(),
            'sorting' => $levels
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id): Responsable
    {
        $level = Hydrate::level($id)->load([
            'images',
            'topTags',
            'videos' => function ($q) {
                $q->inRandomOrder()->limit(5);
            },
            'replays' => function ($q) {
                $q->inRandomOrder()->limit(5);
            },
            'replays.author',
            'replays.files',
        ]);

        $level->replays->transform(function (LevelReplay $replay) {
            $replay->files->transform(function (Media $media) {
                $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
                $result = $hashids->encode([$media->id, 0]);
                $media->setAttribute('url', route('download', $result));
                return $media;
            });
            return $replay;
        });

        $reviews = sorting(Review::query()->where('level_id', $level->id))->with(['author']);

        return page('Levels/Show', [
            'level' => $level->loadCount(['reviewsOnly', 'ratingsOnly']),
            'ranking' => CalculateRatings::rank($id, true),
            'reviews' => $reviews
                ->filters()
                ->paginatorOptions(10, 1, 50)
                ->paginate()
                ->withPath(route('levels.reviews.show', $id)),
            'review' => auth()->check() ? Review::query()
                ->where('level_id', $id)
                ->where('user_id', auth()->id())
                ->first() : null,
            'sorting' => sorting(Review::class)->filters()
        ])->meta($level->name, $level->description)
            ->breadcrumbs([
                crumb('Levels', route('levels.index'))
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function tags(Level $level): Responsable
    {
        $votes = [];
        if (auth()->check()) {
            $votes = CrowdVote::query()
                ->where('user_id', auth()->id())
                ->where('related_id', $level->id)
                ->where('related_type', $level->getMorphClass())
                ->where('votable_type', (new Tag())->getMorphClass())
                ->get();
        }

        return page('Levels/Sections/Tags', [
            'level' => $level->load('tags'),
            'tags' => Tag::all(),
            'votes' => $votes
        ])->meta('Tags', $level->description)->breadcrumbs([
            crumb('Levels', route('levels.index')),
            crumb($level->name, route('levels.show', $level)),
        ]);
    }

    public function reviews(Level $level): Responsable
    {
        return page('Levels/Sections/Reviews', [
            'level' => $level,
            'reviews' => sorting(Review::query()->where('level_id', $level->id))
                ->with('author')
                ->filters()
                ->paginatorOptions(10, 1, 50)
                ->paginate(),
            'review' => auth()->check() ? Review::query()
                ->where('level_id', $level->id)
                ->where('user_id', auth()->id())
                ->first() : null,
            'sorting' => sorting(Review::class)->filters()
        ])->meta('Reviews', $level->description)->breadcrumbs([
            crumb('Levels', route('levels.index')),
            crumb($level->name, route('levels.show', $level)),
        ]);
    }

    public function replays(Level $level)
    {
        return page('Levels/Sections/Replays', [
            'level' => $level,
            'replays' => $level->replays()
                ->with([
                    'author',
                    'files'
                ])->paginate(12)
                ->through(function (LevelReplay $r) {
                    $r->files->transform(function (Media $media) {

                        $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
                        $result = $hashids->encode([$media->id, 0]);
                        $media->setAttribute('url', route('download', $result));
                        return $media;
                    });

                    return $r;
                })
        ])->meta('Replays', $level->description)->breadcrumbs([
            crumb('Levels', route('levels.index')),
            crumb($level->name, route('levels.show', $level)),
        ]);
    }

    public function videos(Level $level)
    {
        return page('Levels/Sections/Videos', [
            'level' => $level,
            'videos' => $level->videos()
                ->paginate(12)
        ])->meta('Videos', $level->description)->breadcrumbs([
            crumb('Levels', route('levels.index')),
            crumb($level->name, route('levels.show', $level)),
        ]);
    }

    public function view(Level $level): Responsable
    {
        // TODO: put hydration here?
        $res = Http::get('https://history.geometrydash.eu/api/v1/level/' . $level->id)->json();
        $records = [];
        foreach ($res['records'] as $record) {
            if ($record['record_type'] === 'download') $records[] = $record;
        }

        if (count($records) === 0) abort(404);

        $res = Http::get('https://history.geometrydash.eu/level/' . $level->id . '/' . $records[0]['id'] . '/download')->body();

        return page('Levels/Viewer', [
            'levelData' => $res
        ])->meta('Level Viewer', 'View levels in your browser');
    }

    public function images(Level $level): Response
    {
        return Inertia::render('Levels/Images', [
            'level' => $level,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Level $level): Response
    {
        return Inertia::render('Levels/Edit', [
            'level' => $level,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Level $level): RedirectResponse
    {
        switch ($request->input('action')) {
            case 'update banner':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:5000',
                ]);
                $disk = Storage::disk('contabo');
                $old = $level->banner_url;

                $image = Image::make($request->file('content')->getRealPath())
                    ->fit(1920, 1080)
                    ->stream('jpeg', 80);

                $filename = explode('.', $request->file('content')->hashName());
                $filename[count($filename) - 1] = 'jpg';
                $filename = 'levels/banners/' . join('.', $filename);

                if ($disk->put($filename, $image, 'public')) {
                    $level->banner_url = config('app.storage_url') . $filename;
                    $level->save();

                    // Delete old if no more references
                    if (Level::query()->where('banner_url', $old)->count() === 0) {
                        $disk->delete(substr($old, strlen(config('app.storage_url'))));
                    }
                }
                break;
        }

        return redirect()->back();
    }

    public function random(): RedirectResponse
    {
        $level = Level::query()->inRandomOrder()->first();

        return redirect()->route('levels.show', $level->id);
    }
}
