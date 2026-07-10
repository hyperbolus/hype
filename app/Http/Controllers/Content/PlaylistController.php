<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use App\Models\Content\PlaylistSubmission;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PlaylistController extends Controller
{
    public function index(): Responsable
    {
        $sorting = sorting(Playlist::class)
            ->with(['owner'])
            ->where('visibility', '=', 'public')
            ->paginatorOptions(10, 1, 30);

        return page('Playlists/Index', [
            'playlists' => $sorting->paginate(),
            'sorting' => $sorting
        ])->meta('Playlists', 'Browser user-created level playlists');
    }

    public function create(): Responsable
    {
        return page('Playlists/Create')
            ->meta('Create a Playlist', 'Create a new playlist of levels')
            ->breadcrumbs([
                crumb('Playlists', route('playlists.index'))
            ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|max:64',
            'description' => 'max:255'
        ]);

        $playlist = Playlist::create([
            ...$validated,
            'owner_id' => $request->user()->id
        ]);

        return redirect()->route('playlists.show', $playlist);
    }

    public function show(Request $request, Playlist $playlist): Responsable
    {
        $playlist->load(['owner', 'submissions' => function ($query) {
            $query->orderBy('rank', 'asc');
        }]);

        return page('Playlists/Show', [
            'playlist' => $playlist
        ])->meta($playlist->title . ' by ' . $playlist->owner->name, $request->has('invite') ? 'You\'ve been invited to edit ' . $playlist->title : $playlist->description)
            ->breadcrumbs([
                crumb('Playlists', route('playlists.index'))
            ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function edit(Playlist $playlist): Responsable
    {
        $this->authorize('edit', [$playlist]);

        return page('Playlists/Edit', [
            'playlist' => $playlist->load(['owner', 'submissions' => function ($query) {
                $query->orderBy('rank', 'asc');
            }, 'submissions.submitter']),
        ])->meta('Edit ' . $playlist->title, $playlist->description, false)
            ->breadcrumbs([
                crumb('Playlists', route('playlists.index')),
                crumb($playlist->title, route('playlists.show', $playlist->id)),
                crumb('Edit', route('playlists.edit', $playlist->id)),
            ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function update(Request $request, Playlist $playlist): RedirectResponse
    {
        $this->authorize('edit', $playlist);

        $validated = $request->validate([
            'title' => 'required|max:64',
            'description' => 'max:255',
            'visibility' => [Rule::in(['public', 'unlisted', 'private'])],
            'collaboration' => [Rule::in('public', 'invite', 'none')],
            'attribution' => [Rule::in('shown', 'others', 'hidden')],
            'type' => [Rule::in('ordered', 'unordered')],
        ]);

        $rankings = $request->array('rankings');

        for ($i = 0; $i < count($rankings); $i++) {
            $rankings[$i] = [
                'id' => $rankings[$i]|0,
                'rank' => Str::padLeft($i, 5, '0') . '-' . $i,
            ];
        }

        PlaylistSubmission::query()->upsert($rankings, 'id', ['rank']);

        $playlist->update($validated);

        return back();
    }

    public function destroy(Playlist $playlist)
    {
        //
    }
}
