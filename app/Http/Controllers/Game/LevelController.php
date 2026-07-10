<?php

namespace App\Http\Controllers\Game;

use App\Actions\CalculateRatings;
use App\Actions\Hydrate;
use App\FilterBuilder;
use App\Http\Controllers\Controller;
use App\Models\Content\CrowdVote;
use App\Models\Content\Playlist;
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
use Intervention\Image\ImageManager;

class LevelController extends Controller
{
    protected function common(Request $request, string $component, int $id, callable $props, ?string $title = null, ?string $description = null)
    {
        $level = Hydrate::level($id)->loadCount([
            'reviewsOnly',
            'ratingsOnly',
            'reviews',
            'tags',
            'replays',
            'videos'
        ])->load([
            'images',
            'topTags',
            'videos' => function ($q) {
                $q->inRandomOrder()->limit(3);
            },
            'replays' => function ($q) {
                $q->inRandomOrder()->limit(5);
            },
            'replays.author',
            'replays.files',
        ]);

//        $level = $level->first();

        if (!$level) abort(400);

        // Edit replay download links to use our tracked download route
        if ($level->hasAttribute('replays')) $level->replays->transform(function (LevelReplay $replay) {
            $replay->files->transform(function (Media $media) {
                $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
                $result = $hashids->encode([$media->id, 0]);
                $media->setAttribute('url', route('download', $result));
                return $media;
            });
            return $replay;
        });

        $breadcrumbs = [
            crumb('Levels', route('levels.index')),
        ];

        if ($component !== 'Levels/Show') $breadcrumbs[] = crumb($level->name, route('levels.show', $level));

        if (!$title) $title = $level->name;
        if (!$description) $description = $level->description;

        return page($component, [
            'level' => $level,
            'levelTagVotes' => auth()->check() ? CrowdVote::query()
                ->where('user_id', auth()->id())
                ->where('related_id', $level->id)
                ->where('related_type', $level->getMorphClass())
                ->where('votable_type', new Tag()->getMorphClass())
                ->get() : [],
            'tags' => Tag::all(),

            'ranking' => CalculateRatings::rank($id),

            'reviews' => Review::query()
                ->where('level_id', $level->id)
                ->whereNot('review', '')
                ->with('author')
                ->latest()
                ->limit(3)
                ->get(),

            ...$props($level),
        ])->meta($title, $description)
            ->breadcrumbs($breadcrumbs);
    }

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

        if (in_array($request->string('sortBy'), ['rating_overall', 'rating_visuals', 'rating_gameplay'/*, 'rating_difficulty'*/])) {
            $levels->whereNotNull('levels.' . $request->string('sortBy'));
            $levels->orderBy('reviews_count', 'desc');
        }

        return Inertia::render('Levels/Index', [
            'levels' => $levels->orderBy('id')
                ->paginatorOptions(10, 1, 30)
                ->paginate(),
            'sorting' => $levels,
            'curve' => cacheOr('statistics:level-curve', fn () => Review::curve(), 600),
        ]);
    }

    public function show(Request $request, $id): Responsable
    {
        return $this->common($request, 'Levels/Show', $id, function (Level $level) use ($request) {
            $moreBy = Level::query()
                ->where('creator', $level->creator)
                ->whereNot('id', $level->id)
                ->withCount('reviews')
                ->limit(3);

            // Get user's own review for the level ticket
            if (auth()->check()) $moreBy->with(['reviews' => function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            }]);

            $playlistQuery = Playlist::query()->with(['owner'])->whereHas('levels', function ($query) use ($level) {
                $query->where('level_id', $level->id);
            });

            // TODO: use scope maybe and include own playlists if unlisted or private
            if ((auth()->check() && !auth()->user()->hasAnyRole(['moderator', 'admin'])) || !auth()->check()) $playlistQuery->where('visibility', 'public');

            return [
                'ranking' => CalculateRatings::rank($level->id),
                'reviews' => Review::query()
                    ->where('level_id', $level->id)
                    ->whereNot('review', '')
                    ->with('author')
                    ->latest()
                    ->limit(3)
                    ->get(),
                'moreBy' => $moreBy->limit(3)->get(),
                'review' => auth()->check() ? Review::query()
                    ->where('level_id', $level->id)
                    ->where('user_id', auth()->id())
                    ->with(['author', 'level'])
                    ->first() : null,
                'playlists' => $playlistQuery->get(),
                'curve' => Review::curve($level),
            ];
        });
    }

    public function tags(Request $request, int $id): Responsable
    {
        return $this->common($request, 'Levels/Sections/Tags', $id, function (Level $level) {
            $level->load(['tags']);
            return [];
        }, 'Tags', 'View level tags');
    }

    public function reviews(Request $request, int $id): Responsable
    {
        return $this->common($request, 'Levels/Sections/Reviews', $id, function (Level $level) {
            return [
                'sorting' => sorting(Review::class)->filters(),
                'reviews' => sorting(Review::query()->where('level_id', $level->id))
                    ->with('author')
                    ->filters()
                    ->paginatorOptions(10, 1, 50)
                    ->paginate(),
                'review' => auth()->check() ? Review::query()
                    ->where('level_id', $level->id)
                    ->where('user_id', auth()->id())
                    ->with(['author', 'level'])
                    ->first() : null,
            ];
        }, 'Reviews', 'View level reviews');
    }

    public function replays(Request $request, int $id)
    {
        return $this->common($request, 'Levels/Sections/Replays', $id, function (Level $level) {
            return [
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
            ];
        }, 'Replays', 'View level replays');
    }

    public function videos(Request $request, int $id)
    {
        return $this->common($request, 'Levels/Sections/Videos', $id, function (Level $level) {
            return [
                'videos' => $level->videos()->paginate(12)
            ];
        }, 'Videos', 'View level videos');
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
        return Inertia::render('Levels/Sections/Images', [
            'level' => $level,
        ]);
    }

    public function edit(Level $level): Responsable
    {
        return page('Levels/Edit', [
            'level' => $level,
        ])->meta('Edit', 'Edit level metadata');
    }

    public function update(Request $request, Level $level): RedirectResponse
    {
        $disk = Storage::disk('contabo');

        switch ($request->input('action')) {
            case 'update banner':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:5000',
                ]);

                $old = $level->banner_url;

                $image = ImageManager::imagick()->read($request->file('content')->getRealPath())
                    ->cover(1920, 1080)
                    ->toJpeg(80);

                $filename = explode('.', $request->file('content')->hashName());
                $filename[count($filename) - 1] = 'jpg';
                $filename = 'levels/banners/' . join('.', $filename);

                if ($disk->put($filename, $image, 'public')) {
                    $level->banner_url = config('app.storage_url') . $filename;
                    $level->save();

                    // Delete old if no more references
                    if (Level::query()->where('banner_url', $old)->count() === 0) $disk->delete(substr($old, strlen(config('app.storage_url'))));
                }
                break;
            case 'update preview':
                $request->validate([
                    'content' => 'mimes:webm|required|max:10000',
                ]);

                $old = $level->preview_url;

                $path = 'levels/previews/';

                if ($request->file('content')->storePubliclyAs($path, $request->file('content')->hashName(), 'contabo')) {
                    $level->preview_url = config('app.storage_url') . $path . $request->file('content')->hashName();
                    $level->save();

                    if (Level::query()->where('preview_url', $old)->count() === 0) $disk->delete(substr($old, strlen(config('app.storage_url'))));
                }
                break;
        }

        return redirect()->back();
    }

    public function random(): RedirectResponse
    {
        return redirect()->route('levels.show', Level::query()->inRandomOrder()->first()->id);
    }
}
