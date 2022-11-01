<?php

namespace App\Http\Controllers;

use App\Actions\Hydrate;
use App\Models\Playlist;
use App\Models\PlaylistSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlaylistSubmissionController extends Controller
{
    public function index()
    {
        //
    }

    public function create(Playlist $playlist): Response
    {
        return Inertia::render('Submissions/Create', [
            'playlist' => $playlist
        ]);
    }

    public function store(Request $request, Playlist $playlist): RedirectResponse
    {
        // TODO: validation
        $submission = new PlaylistSubmission();
        $submission->submitter_id = auth()->check() ? auth()->id() : null;
        $submission->playlist_id = $playlist->id;
        $submission->level_id = $request->integer('level_id');
        $submission->server_id = 0;
        $submission->save();

        Hydrate::level($request->input('level_id'));

        return redirect()->route('playlists.show', $playlist);
    }

    public function show(PlaylistSubmission $playlistSubmission)
    {
        //
    }

    public function edit(PlaylistSubmission $playlistSubmission)
    {
        //
    }

    public function update(Request $request, PlaylistSubmission $playlistSubmission)
    {
        //
    }

    public function destroy(PlaylistSubmission $playlistSubmission)
    {
        //
    }
}
