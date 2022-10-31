<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $forums = Forum::query()->where('parent_id', '=', null)->orderBy('priority', 'ASC')->with(['children'])->get();
        foreach ($forums as $forum) {
            $forum->children->map(function (Forum $forum) {
                $key = 'forums:' . $forum->id . ':post_count';
                $data = Cache::get($key);
                if ($data === null) {
                    $forum->loadCount('posts');
                    Cache::put($key, $forum->posts_count, now()->addHour());
                } else {
                    $forum['posts_count'] = $data;
                }

                $key = 'forums:' . $forum->id . ':thread_count';
                $data = Cache::get($key);
                if ($data === null) {
                    $forum->loadCount('threads');
                    Cache::put($key, $forum->threads_count, now()->addHour());
                } else {
                    $forum['threads_count'] = $data;
                }
            });
        }

        return Inertia::render('Forums', [
            'forums' => $forums
        ]);
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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Forum  $forum
     * @return Response
     */
    public function show(Forum $forum)
    {
        $forum->load('children')->load(['threads', 'threads.author']);
        $forum->threads->map(function (Thread $thread) {
            $key = 'threads:' . $thread->id . ':posts_count';
            $data = Cache::get($key);
            if ($data === null) {
                $thread->loadCount('posts');
                Cache::put($key, $thread->posts_count, now()->addHour());
            } else {
                $thread['posts_count'] = $data;
            }
        });
        return Inertia::render('Forums/Show', [
            'forum' => $forum,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Forum  $forum
     * @return \Illuminate\Http\Response
     */
    public function edit(Forum $forum)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Forum  $forum
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Forum $forum)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Forum  $forum
     * @return \Illuminate\Http\Response
     */
    public function destroy(Forum $forum)
    {
        //
    }
}
