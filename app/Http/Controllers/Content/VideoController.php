<?php

namespace App\Http\Controllers\Content;

use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Videos/Index', [
            'videos' => Video::query()->paginate(25)
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Hydrate::level($request->input('level_id'));

        $video = new Video();
        $video->video_id = $request->string('video_id');
        $video->user_id = $request->user()->id;
        $video->level_id = $request->integer('level_id');
        $video->save();

        return redirect()->route('levels.show', $request->integer('level_id'));
    }

    public function show(Video $video)
    {
        //
    }

    public function edit(Video $video)
    {
        //
    }

    public function update(Request $request, Video $video)
    {
        //
    }

    public function destroy(Video $video)
    {
        //
    }
}
