<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\Playlist;
use App\Models\PlaylistSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PlaylistSubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(Playlist $playlist)
    {
        return Inertia::render('Submissions/Create', [
            'playlist' => $playlist
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Playlist $playlist)
    {
        $submission = new PlaylistSubmission();
        $submission->submitter_id = $request->user()->id;
        $submission->playlist_id = $playlist->id;
        $submission->level_id = $request->level_id;
        $submission->server_id = 0;
        $submission->save();

        if(Level::where('id', '=', $request->level_id)->first() === null) {
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

        return redirect()->route('playlists.show', $playlist);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PlaylistSubmission  $playlistSubmission
     * @return \Illuminate\Http\Response
     */
    public function show(PlaylistSubmission $playlistSubmission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PlaylistSubmission  $playlistSubmission
     * @return \Illuminate\Http\Response
     */
    public function edit(PlaylistSubmission $playlistSubmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PlaylistSubmission  $playlistSubmission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PlaylistSubmission $playlistSubmission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PlaylistSubmission  $playlistSubmission
     * @return \Illuminate\Http\Response
     */
    public function destroy(PlaylistSubmission $playlistSubmission)
    {
        //
    }
}
