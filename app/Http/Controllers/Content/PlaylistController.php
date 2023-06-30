<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PlaylistController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Playlists/Index', [
            'playlists' => Playlist::query()->where('visibility', '=', 'public')->paginate(),
        ]);
    }

    public function create(Playlist $playlist): Response
    {
        return Inertia::render('Playlists/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:64',
            //'description' => '',
        ]);

        $playlist = new Playlist();
        $playlist->title = request('title');
        $playlist->description = request('description');
        $playlist->owner_id = $request->user()->id;
        $playlist->save();

        return redirect()->route('playlists.show', $playlist);
    }

    public function show(Playlist $playlist): Response
    {
        $playlist->load(['owner', 'submissions']);

        $__meta_description = '';
        $__meta_title = $playlist->title.' by '.$playlist->owner->name;
        if (\request('invite')) {
            $__meta_description .= 'You\'ve been invited to edit '.$__meta_title;
        } else {
            $__meta_description = $playlist->description;
        }

        return Inertia::render('Playlists/Show', [
            'playlist' => $playlist,
            ...meta($__meta_title, $__meta_description),
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function edit(Playlist $playlist): Response
    {
        $this->authorize('edit', [$playlist]);

        return Inertia::render('Playlists/Edit', [
            'playlist' => $playlist,
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function update(Request $request, Playlist $playlist)
    {
        $this->authorize($playlist);

        $request->validate([
            'title' => 'required|max:64',
            'description' => 'max:255',
            'visibility' => [Rule::in(['public', 'unlisted', 'private'])],
            'collaboration' => [Rule::in('public', 'invite', 'none')]
        ]);

        $playlist->title = $request->string('title');
        $playlist->description = $request->string('description');
        $playlist->visibility = $request->string('visibility');
        $playlist->collaboration = $request->string('collaboration');
        $playlist->save();

        return back();
    }

    public function destroy(Playlist $playlist)
    {
        //
    }
}
