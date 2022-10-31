<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\LevelTag;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request): Response
    {

        $attributes = [
            'rating_overall',
            'rating_gameplay',
            'rating_visual',
            'rating_overall',
            'reviews_count',
        ];
        $filters = [
            'Unreviewed',
            'Reviewed'
        ];
        $directions = [
            'DESC',
            'ASC'
        ];
        $sorting = [
            'sortBy' => $request->sortBy ?? 0,
            'sortDir' => $request->sortDir ?? 0,
            'filter' => $request->filter ?? 0,
        ];
        if($request->filter == 0) {
            return Inertia::render('Levels/Index', [
                'levels' => Level::query()->withCount('reviews')->orderBy($attributes[$request->sortBy] ?? 'rating_overall', $directions[$request->sortDir] ?? 'DESC')->paginate(10)->appends(['sortBy' => $request->sortBy ?? 0, 'sortDir' => $request->sortDir ?? 0]),
                'filters' => $sorting
            ]);
        } else if(auth()->check()) {
            return Inertia::render('Levels/Index', [
                'levels' => $request->user->reviewedLevels->withCount('reviews')->orderBy($attributes[$request->sortBy] ?? 'rating_overall', $directions[$request->sortDir] ?? 'DESC')->get(),
                'filters' => $sorting
            ]);
        } else {
            return response('You must be signed in to use this feature', 400);
        }
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {

        if(Level::where('id', '=', $request->level_id)->first() !== null) {
            return redirect()->route('levels.show', $request->level_id);
        }

        $res = Http::get('https://browser.gdps.io/api/level/' . $request->level_id)->json();

        if($res == -1) {
            return response('Level Not Found', 400);
        }

        $level = new Level();
        $level->id = $request->level_id;
        $level->name = $res['name'];
        $level->creator = $res['author'];
        $level->description = $res['description'];
        $level->save();

        return redirect()->route('levels.show', $level);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param $id
     * @return Response|\Illuminate\Http\Response
     */
    public function show(Request $request, $id): Response|\Illuminate\Http\Response
    {
        $level = Level::query()->find($id);

        if($level === null) {
            $res = Http::get('https://browser.gdps.io/api/level/' . $request->id)->json();

            if($res == -1) {
                return response('Level Not Found', 400);
            }

            $level = new Level();
            $level->id = $id;
            $level->name = $res['name'];
            $level->creator = $res['author'];
            $level->description = $res['description'];

            $difficulties = [
                'unrated' => 0,
                'auto' => 1,
                'easy' => 2,
                'normal' => 3,
                'hard' => 4,
                'harder' => 5,
                'insane' => 6,
                'easy demon' => 7,
                'medium demon' => 8,
                'hard demon' => 9,
                'insane demon' => 10,
                'extreme demon' => 11,
            ];

            $lengths = [
                'tiny' => 0,
                'short' => 1,
                'medium' => 2,
                'long' => 3,
                'xl' => 4
            ];

            $level->difficulty = $difficulties[strtolower($res['difficulty'])];
            $level->featured = $res['featured'];
            $level->epic = $res['epic'];
            $level->coins_verified = $res['verifiedCoins'];
            $level->coins = $res['coins'];
            $level->stars = $res['stars'];
            if ($res['officialSong'] === 0) {
                $level->song_id = $res['songID'];
                $level->song_url = $res['songLink'];
            }
            $level->song_name = $res['songName'];
            $level->song_author = $res['songAuthor'];
            $level->objects = $res['objects'];
            $level->downloads = $res['downloads'];
            $level->likes = $res['likes'];
            $level->length = $lengths[strtolower($res['length'])];

            $level->save();
        }

        $level->load('tags');

        return Inertia::render('Levels/Show', [
            'level' => $level->load(['reviews', 'reviews.author', 'videos']),
            'review' => auth()->check() ? Review::query()
                ->where('level_id', $id)
                ->where('user_id', auth()->user()->id)
                ->first(): null
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param $id
     * @return Response|\Illuminate\Http\Response
     */
    public function tags(Level $level): Response|\Illuminate\Http\Response
    {
        return Inertia::render('Levels/Tags', [
            'level' => $level->load('tags'),
            'tags' => LevelTag::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Level $level
     * @return Response
     */
    public function edit(Level $level): Response
    {
        return Inertia::render('Levels/Edit', [
            'level' => $level,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Level $level
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Level $level): \Illuminate\Http\RedirectResponse
    {
        switch ($request->action) {
            case 'update banner':
                $request->validate([
                    'content' => 'mimes:jpeg,jpg,png,webp,gif|required|max:5000'
                ]);
                $disk = Storage::disk('contabo');
                $old = $level->banner_url;
                $level->banner_url = config('filesystems.cdn') . $disk->putFile('levels/banners/', $request->file('content'), 'public');
                $level->save();
                if (Level::whereBannerUrl($old)->count() === 0) {
                    $disk->delete(substr($old, strlen(config('filesystems.cdn'))));
                }
                break;
            case 'update tags':
                //
                break;
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Level $level
     * @return \Illuminate\Http\Response
     */
    public function destroy(Level $level)
    {
        //
    }
}
