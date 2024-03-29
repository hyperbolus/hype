<?php

namespace App\Http\Controllers\Content;

use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use App\Models\Content\PlaylistSubmission;
use App\Models\System\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PlaylistSubmissionController extends Controller
{
    public function index()
    {
        //
    }

    /**
     * @throws AuthorizationException
     */
    public function create(Playlist $playlist): Response
    {
        $this->authorize('create', [PlaylistSubmission::class, $playlist]);

        return Inertia::render('Submissions/Create', [
            'playlist' => $playlist,
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function store(Request $request, Playlist $playlist): RedirectResponse
    {
        $this->authorize('create', [PlaylistSubmission::class, $playlist]);

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
