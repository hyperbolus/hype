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
use Illuminate\Support\Str;

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

        $rank = '00000-0';

        if (!$request->has('rank')) {
            $last = $playlist->submissions()->orderByDesc('rank')->first();
            if ($last && Str::contains($last->rank, '-')) {
                $next = intval(Str::after($last->rank, '-')) + 1;
                $rank = Str::padLeft($next, 5, '0') . '-' . $next;
            }
        }

        $submission = new PlaylistSubmission();
        $submission->submitter_id = auth()->check() ? auth()->id() : null;
        $submission->playlist_id = $playlist->id;
        $submission->level_id = $request->integer('level_id');
        $submission->rank = $request->string('rank', $rank);
        $submission->server_id = 0;
        $submission->save();

        return back();
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

        $submissions = $submission->playlist->submissions()->orderBy('rank')->get();

        $rankings = [];

        for ($i = 0; $i < count($submissions); $i++) {
            $rankings[$i] = [
                'id' => $submissions[$i]->id,
                'rank' => Str::padLeft($i, 5, '0') . '-' . $i,
            ];
        }

        PlaylistSubmission::query()->upsert($rankings, 'id', ['rank']);

        return back();
    }
}
