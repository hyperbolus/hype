<?php

namespace App\Http\Controllers;

use App\Models\Content\Post;
use App\Models\Content\Thread;
use App\Models\Forum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

;

class ThreadController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Threads/Create', [
            'forum_id' => \request('fid') ?? null
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required',
            'forum_id' => 'required|exists:\App\Models\Forum,id',
            'post.body' => 'required'
        ]);

        $forum = Forum::query()->find($request->integer('forum_id'));

        if($forum->group_id !== $request->user()->primary_group_id) {
            throw \Illuminate\Validation\ValidationException::withMessages(['forum' => 'You do not have permission to create threads in this forum']);
        }

        $thread = new Thread();
        $thread->title = $request->string('title');
        $thread->forum_id = $request->integer('forum_id');
        $thread->author_id = auth()->id();
        $thread->save();

        $post = new Post();
        $post->thread_id = $thread->id;
        $post->forum_id = $thread->forum_id;
        $post->author_id = $request->user()->id;
        $post->signature = $request->boolean('post.signature');
        $post->rich = $request->boolean('post.rich');
        $post->body = $request->string('post.body');
        $post->save();

        return redirect()->route('threads.show', $thread);
    }

    public function show(Thread $thread): Response
    {
        $thread->load(['author', 'posts', 'posts.author', 'posts.likes', 'posts.likes.liker']);

        dispatch(function () use ($thread) {
            $thread->views = $thread->views + 1;
            $thread->save();
        })->afterResponse();

        return Inertia::render('Threads/Show', [
            'thread' => $thread
        ]);
    }

    public function edit(Thread $thread): Response
    {
        return Inertia::render('Threads/Edit', [
            'thread' => $thread
        ]);
    }

    public function update(Request $request, Thread $thread): RedirectResponse
    {
        $request->validate([
            'title' => 'required|min:5'
        ]);
        $thread->title = $request->string('title');
        $thread->save();

        return redirect()->route('threads.show', $thread);
    }

    public function destroy(Thread $thread)
    {
        //
    }
}
