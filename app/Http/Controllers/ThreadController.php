<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\GroupMembership;
use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ThreadController extends Controller
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
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Threads/Create', [
            'forum_id' => \request('fid') ?? null
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required',
            'forum_id' => 'required|exists:\App\Models\Forum,id',
            'post.body' => 'required'
        ]);

        $forum = Forum::query()->find($request->forum_id);

        if($forum->group_id !== $request->user()->primary_group_id) {
            throw \Illuminate\Validation\ValidationException::withMessages(['forum' => 'You do not have permission to create threads in this forum']);
        }

        $thread = new Thread();
        $thread->title = $request->title;
        $thread->forum_id = $request->forum_id;
        $thread->author_id = $request->user()->id;
        $thread->save();

        $post = new Post();
        $post->thread_id = $thread->id;
        $post->forum_id = $thread->forum_id;
        $post->author_id = $request->user()->id;
        $post->signature = $request->post['signature'];
        $post->rich = $request->post['rich'];
        $post->body = $request->post['body'];
        $post->save();

        return redirect()->route('threads.show', $thread);
    }

    /**
     * Display the specified resource.
     *
     * @param Thread $thread
     * @return Response
     */
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param Thread $thread
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Thread $thread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Thread $thread)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Thread $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        //
    }
}
