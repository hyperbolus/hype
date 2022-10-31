<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Http\Request;

class PostLikeController extends Controller
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
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Post $post)
    {
        $like = new PostLike();
        $like->liker_id = $request->user()->id;
        $like->post_id = $post->id;
        $like->save();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PostLike  $postLike
     * @return \Illuminate\Http\Response
     */
    public function show(PostLike $postLike)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PostLike  $postLike
     * @return \Illuminate\Http\Response
     */
    public function edit(PostLike $postLike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PostLike  $postLike
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PostLike $postLike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PostLike  $postLike
     * @return \Illuminate\Http\Response
     */
    public function destroy(PostLike $postLike)
    {
        //
    }
}
