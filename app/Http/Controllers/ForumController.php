<?php

namespace App\Http\Controllers;

use App\Models\Content\Thread;
use App\Models\Forum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
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
                $forum->load('lastPost.author');
            });
        }

        return Inertia::render('Forums', [
            'forums' => $forums
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Forum $forum): Response
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

    public function edit(Forum $forum)
    {
        //
    }

    public function update(Request $request, Forum $forum)
    {
        //
    }

    public function destroy(Forum $forum)
    {
        //
    }
}
