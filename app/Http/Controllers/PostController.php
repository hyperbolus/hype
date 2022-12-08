<?php

namespace App\Http\Controllers;

use App\Models\Content\Post;
use App\Models\Content\Thread;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create()
    {
        //
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'body' => 'required|min:20'
        ]);
        /**
         * @var Thread $thread
         */
        $thread = Thread::query()->findOrFail($request->integer('thread_id'));
        $post = new Post();
        $post->signature = $request->boolean('signature');
        $post->thread_id = $request->integer('thread_id');
        $post->forum_id = $thread->forum_id;
        $post->author_id = $request->user()->id;
        $post->body = $request->string('body');
        $post->save();

        return back(); // TODO: use this, way shorter!!!
    }

    public function show(Post $post): RedirectResponse
    {
        $post->load('thread');
        return redirect()->route('threads.show', $post->thread->slug);
    }

    public function edit(Post $post): \Inertia\Response
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $request->validate([
            'body' => 'required|min:20'
        ]);
        $post->signature = $request->boolean('signature');
        $post->body = $request->string('body');
        $post->save();

        return redirect()->route('posts.show', $post->id);
    }

    public function destroy(Post $post)
    {
        //
    }
}
