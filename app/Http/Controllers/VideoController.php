<?php

namespace App\Http\Controllers;

use App\Actions\Hydrate;
use App\Models\Level;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource
     */
    public function index(): Response
    {
        return Inertia::render('Videos/Index', [
            'videos' => Video::paginate(25)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Hydrate::level($request->input('level_id'));

        $video = new Video();
        $video->video_id = $request->video_id;
        $video->user_id = $request->user()->id;
        $video->level_id = $request->level_id;
        $video->save();

        return redirect()->route('levels.show', $request->level_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        //
    }
}
