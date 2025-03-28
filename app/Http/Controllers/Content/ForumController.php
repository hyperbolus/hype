<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Forum;
use App\Models\Content\Post;
use App\Models\Content\Thread;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    public function index(): Responsable
    {
        $forums = Forum::query()
            ->where('parent_id', '=', null)
            ->orderBy('priority', 'ASC')
            ->with(['children'])->get();

        foreach ($forums as $forum) {
            $forum->children->map(function (Forum $forum) {
                $key = 'forums:'.$forum->id.':post_count';
                $data = Cache::get($key);
                if ($data === null) {
                    $forum->loadCount('posts');
                    Cache::put($key, $forum->posts_count, now()->addHour());
                } else {
                    $forum['posts_count'] = $data;
                }

                $key = 'forums:'.$forum->id.':thread_count';
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

        return page('Forums', [
            'forums' => $forums,
            // TODO: Get only one of each (latest of each) thread if it repeats multiple times
            'latestPosts' => Thread::query()
                ->latest('last_activity_at')
                ->whereHas('lastPost')
                ->with(['author', 'lastPost', 'lastPost.author'])
                ->limit(10)
                ->get(),
        ])->meta('Forums', 'Join the discussion');
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
        $forum->load('children');
        $threads = $forum->threads()->with('author')->withCount('posts')->paginate(20);
//        $forum->threads->map(function (Thread $thread) {
//            $key = 'threads:'.$thread->id.':posts_count';
//            $data = Cache::get($key);
//            if ($data === null) {
//                $thread->loadCount('posts');
//                Cache::put($key, $thread->posts_count, now()->addHour());
//            } else {
//                $thread['posts_count'] = $data;
//            }
//        });

        return Inertia::render('Forums/Show', [
            'forum' => $forum,
            'threads' => $threads
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
