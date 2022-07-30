<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
                'levels' => Level::withCount('reviews')->orderBy($attributes[$request->sortBy] ?? 'rating_overall', $directions[$request->sortDir] ?? 'DESC')->get(),
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
     * @param Level $level
     * @return Response
     */
    public function show(Request $request, $id): Response
    {
        $level = Level::where('id', '=', $id)->first();

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
            $level->save();
        }

        return Inertia::render('Levels/Show', [
            'level' => $level->load(['reviews', 'reviews.author', 'videos']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Level $level
     * @return \Illuminate\Http\Response
     */
    public function edit(Level $level)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param Level $level
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Level $level)
    {
        //
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
