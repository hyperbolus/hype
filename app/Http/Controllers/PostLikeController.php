<?php

namespace App\Http\Controllers;

use App\Models\Content\Post;
use App\Models\Social\PostLike;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function store(Request $request, Post $post): RedirectResponse
    {
        // TODO: validate, no dupes
        $like = PostLike::query()->where('liker_id', $request->user()->id)->where('post_id', $post->id)->first();
        if ($like) {
            $like->delete();
        } else {
            $like = new PostLike();
            $like->liker_id = $request->user()->id;
            $like->post_id = $post->id;
            $like->save();
        }

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
