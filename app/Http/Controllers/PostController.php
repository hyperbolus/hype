<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function create()
    {
        //
    }

    public function store(Request $request): RedirectResponse
    {
        /**
         * @var Thread $thread
         */
        $thread = Thread::query()->findOrFail($request->integer('thread_id'));
        $post = new Post();
        $post->rich = $request->boolean('rich');
        $post->signature = $request->boolean('signature');
        $post->thread_id = $request->integer('thread_id');
        $post->forum_id = $thread->forum_id;
        $post->author_id = $request->user()->id;
        $post->body = $request->string('body');
        $post->save();

        return back(); // TODO: use this, way shorter!!!
    }

    public function show(Post $post)
    {
        //
    }

    public function edit(Post $post)
    {
        //
    }

    public function update(Request $request, Post $post)
    {
        //
    }

    public function destroy(Post $post)
    {
        //
    }
}
