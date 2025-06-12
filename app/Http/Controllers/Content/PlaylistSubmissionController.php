<?php

namespace App\Http\Controllers\Content;

use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use App\Models\Content\PlaylistSubmission;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PlaylistSubmissionController extends Controller
{
    public function index()
    {
        //
    }

    /**
     * @throws AuthorizationException
     */
    public function create(Playlist $playlist): Responsable
    {
        $this->authorize('create', [PlaylistSubmission::class, $playlist]);

        return page('Submissions/Create', [
            'playlist' => $playlist,
        ])->meta('Submit', 'Add a level to a playlist')
            ->breadcrumbs([
                crumb('Playlists', route('playlists.index')),
                crumb($playlist->title, route('playlists.show', $playlist->id)),
            ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function store(Request $request, Playlist $playlist): RedirectResponse
    {
        $this->authorize('create', [PlaylistSubmission::class, $playlist]);

        Hydrate::level($request->input('level_id'));

        $submission = new PlaylistSubmission();
        $submission->submitter_id = auth()->check() ? auth()->id() : null;
        $submission->playlist_id = $playlist->id;
        $submission->level_id = $request->integer('level_id');
        $submission->server_id = 0;
        $submission->save();

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

    /**
     * @throws AuthorizationException
     */
    public function destroy(PlaylistSubmission $submission)
    {
        $this->authorize('destroy', [PlaylistSubmission::class, $submission->playlist]);

        $submission->delete();

        return back();
    }
}
