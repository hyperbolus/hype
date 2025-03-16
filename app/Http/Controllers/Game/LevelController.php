<?php

namespace App\Http\Controllers\Game;

use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\CrowdVote;
use App\Models\Content\Review;
use App\Models\Content\Tag;
use App\Models\Game\Level;
use App\Models\Game\LevelReplay;
use App\Models\Media;
use App\Models\System\User;
use Hashids\Hashids;
use Illuminate\Contracts\Support\Responsable;
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
        $attributes = [
            'id',
            'rating_overall',
            'rating_gameplay',
            'rating_visuals',
            'rating_difficulty',
            'reviews_count',
        ];

        $directions = [
            'DESC',
            'ASC',
        ];

        $sorting = [
            'sortBy' => $request->integer('sortBy', 5),
            'sortDir' => $request->integer('sortDir', 0),
            'filter' => $request->integer('filter', 0),
        ];

        $sorting['sortBy'] = $sorting['sortBy'] < count($attributes) ? $sorting['sortBy'] : 0;
        $sorting['sortDir'] = $sorting['sortDir'] < count($directions) ? $sorting['sortDir'] : 0;
        $sorting['filter'] = $sorting['filter'] < 4 ? $sorting['filter'] : 0;
        // TODO: be more explicit about unauthenticated attempt to use filters

        $levels = Level::query();

        if (auth()->check()) {
            /**
             * @var User $user
             */
            $user = auth()->user();

            if ($sorting['filter'] === 1) {
                $levels = $user->reviewedLevels();
            } else if ($sorting['filter'] === 2) {
                $levels = $levels->whereDoesntHave('reviews', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                });
            } else if ($sorting['filter'] === 3) {
                $levels = $levels->whereHas('replays')->whereDoesntHave('approvedReplays');
            }

            $levels->with(['reviews' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }]);
        }

        return Inertia::render('Levels/Index', [
            'levels' => $levels
                ->whereNotNull($attributes[$sorting['sortBy']])
                ->orderBy($attributes[$sorting['sortBy']], $directions[$sorting['sortDir']])
                ->orderBy('id') // TODO: Break ties so it's not random (which for some reason it is? maybe study)
                ->withCount('reviews')
                ->paginate(10)
                ->appends($sorting),
            'filters' => $sorting,
            'recent_reviews' => Review::query()
                ->whereNotNull('review')
                ->whereNot('review', '=', '')
                ->latest()
                ->limit(10)
                ->with(['author', 'level'])
                ->get()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): Responsable
    {
        $level = Hydrate::level($id)->load([
            'images',
            'tags',
            'videos' => function ($q) {
                $q->inRandomOrder()->limit(5);
            },
            'replays' => function ($q) {
                $q->inRandomOrder()->limit(5);
            },
            'replays.author',
            'replays.files',
        ])->loadCount(['reviews']);

        $level->replays->transform(function (LevelReplay $replay) {
            $replay->files->transform(function (Media $media) {
                $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
                $result = $hashids->encode([$media->id, 0]);
                $media->setAttribute('url', route('download', $result));
                return $media;
            });
            return $replay;
        });

        return page('Levels/Show', [
            'level' => $level,
            'reviews' => $level->reviews()
                ->latest()
                ->with('author')
                ->paginate(5)
                ->withPath(route('levels.reviews.show', $id)),
            'review' => auth()->check() ? Review::query()
                ->where('level_id', $id)
                ->where('user_id', auth()->id())
                ->first() : null,
        ])->meta($level->name, $level->description)
            ->breadcrumbs([
                [
                    'text' => 'Levels',
                    'url' => route('levels.index'),
                ]
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function tags(Level $level): Response
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

        return Inertia::render('Levels/Sections/Tags', [
            'level' => $level->load('tags'),
            'tags' => Tag::all(),
            'votes' => $votes
        ]);
    }

    public function reviews(Level $level) {
        return page('Levels/Sections/Reviews', [
            'level' => $level
                ->loadCount('reviews'),
            'reviews' => $level->reviews()
                ->latest()
                ->with('author')
                ->paginate(5),
            'review' => auth()->check() ? Review::query()
                ->where('level_id', $level->id)
                ->where('user_id', auth()->id())
                ->first() : null,
        ]);
    }

    public function replays(Level $level) {
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
        ]);
    }

    public function videos(Level $level) {
        return page('Levels/Sections/Videos', [
            'level' => $level,
            'videos' => $level->videos()
                ->paginate(12)
        ]);
    }

    public function view(Level $level): Responsable {
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
