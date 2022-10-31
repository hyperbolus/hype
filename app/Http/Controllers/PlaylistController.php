<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Playlists/Index', [
            'playlists' => Playlist::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(Playlist $playlist): \Inertia\Response
    {
        return Inertia::render('Playlists/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            //'description' => '',
        ]);

        $playlist = new Playlist();
        $playlist->title = request('title');
        $playlist->description = request('description');
        $playlist->owner_id = $request->user()->id;
        $playlist->save();

        return redirect()->route('playlists.show', $playlist);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Playlist  $playlist
     * @return \Inertia\Response
     */
    public function show(Playlist $playlist): \Inertia\Response
    {
        $playlist->load(['owner', 'submissions']);

        $__meta_description = '';
        $__meta_title = '';
        if (\request('invite')) {
            $__meta_description .= 'You\'ve been invited to edit ' . $playlist->title . ' by ' . $playlist->owner->name;
        } else {
            $__meta_description = $playlist->description;
        }
        $__meta_title = $playlist->title . ' by ' . $playlist->owner->name;

        return Inertia::render('Playlists/Show', [
            'playlist' => $playlist,
            '__meta_description' => $__meta_description,
            '__meta_title' => $__meta_title,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function edit(Playlist $playlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Playlist $playlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Playlist $playlist)
    {
        //
    }
}
