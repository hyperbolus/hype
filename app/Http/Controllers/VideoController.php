<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Videos/Index', [
            'videos' => Video::all()
        ]);
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
        $level = Level::where('id', '=', $request->level_id)->first();

        if($level === null) {
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
        }

        $video = new Video();
        $video->video_id = $request->video_id;
        $video->user_id = $request->user()->id;
        $video->level_id = $request->level_id;
        $video->save();

        return redirect()->route('levels.show', $request->level_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function destroy(Video $video)
    {
        //
    }
}
