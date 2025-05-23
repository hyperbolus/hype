<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Forum;
use App\Models\Content\Thread;
use Illuminate\Contracts\Support\Responsable;

class ForumController extends Controller
{
    public function index(): Responsable
    {
        $forums = Forum::query()
            ->where('parent_id', '=', null)
            ->orderBy('priority', 'ASC')
            ->with(['children' => function($q) {
                $q->withCount(['posts', 'threads'])->with(['lastPost.author']);
            }])->get();

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

    public function show(string $slug): Responsable
    {
        $forum = Forum::query()
            ->with([
                'parent',
                'children' => function($q) {
                    $q->withCount(['posts', 'threads'])->with(['lastPost.author']);
                },
            ])
            ->where('slug', $slug)
            ->firstOrFail();

        $threads = $forum->threads()->with('author')->withCount('posts')->paginate(20);

        return page('Forums/Show', [
            'forum' => $forum,
            'threads' => $threads
        ])->meta($forum->name, $forum->description)
            ->breadcrumbs([
                crumb('Forums', route('forums.index')),
                crumb($forum->parent->name, route('forums.show', $forum->parent->slug ?? ''), !$forum->parent->category),
            ]);
    }
}
