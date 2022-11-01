<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostLike;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function store(Request $request, Post $post): RedirectResponse
    {
        // TODO: validate, no dupes
        $like = new PostLike();
        $like->liker_id = $request->user()->id;
        $like->post_id = $post->id;
        $like->save();

        return redirect()->back();
    }

    public function edit(PostLike $postLike)
    {
        //
    }

    public function destroy(PostLike $postLike)
    {
        //
    }
}
