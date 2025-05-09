<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PlaylistController extends Controller
{
    public function index(): Responsable
    {
        $sorting = sorting(Playlist::class)
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
        $playlist->load(['owner', 'submissions']);

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
            'playlist' => $playlist,
        ])->meta('Edit ' . $playlist->title, $playlist->description)
            ->breadcrumbs([
                crumb('Playlists', route('playlists.index')),
                crumb($playlist->title, route('playlists.show', $playlist->id)),
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
            'collaboration' => [Rule::in('public', 'invite', 'none')]
        ]);

        $playlist->update($validated);

        return back();
    }

    public function destroy(Playlist $playlist)
    {
        //
    }
}
