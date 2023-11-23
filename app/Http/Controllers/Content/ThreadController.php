<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Forum;
use App\Models\Content\Post;
use App\Models\Content\Thread;
use App\Models\System\Subscription;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ThreadController extends Controller
{
    public function create(): Responsable
    {
        return page('Threads/Create', [
            'forum_id' => \request('fid') ?? null,
        ])
            ->meta('Create Thread', 'Start a discussion')
            ->breadcrumbs([
                crumb('Forums', route('forums.index'))
            ]);
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required',
            'forum_id' => 'required|exists:forums,id',
            'post.body' => 'required',
        ]);

        $forum = Forum::query()->find($request->integer('forum_id'));

        // TODO: Move to policy
        if ($forum->group_id && $forum->group_id !== $request->user()->primary_group_id) {
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

        Subscription::create([
            'subscriber_id' => $request->user()->id,
            'subscribable_id' => $thread->getMorphClass(),
            'subscribable_type' => $thread->id,
            'email' => $request->has('watch_email') ? $request->boolean('watch_email') : null,
        ]);

        return redirect()->route('threads.show', $thread);
    }

    public function show(Request $request, Thread $thread): Response
    {
        $thread->load(['author', 'forum']);

        dispatch(function () use ($thread) {
            $thread->views++;
            $thread->save(['timestamps' => false]);
        })->afterResponse();

        // TODO: Re-add this later also make it work with pagination
//        if (!!$user = auth()->user()) {
//            /** @var User $user */
//            if ($user->hasRole('admin')) {
//                $thread->posts->each(function (Post $post) {
//                    $post->makeVisible('ip');
//                });
//            }
//        }

        return Inertia::render('Threads/Show', [
            'thread' => $thread,
            'posts' => $thread->posts()
                ->with(['media', 'reactions', 'reactions.reacter', 'author' => function(BelongsTo $q) {
                    $q->withCount('posts');
                }])
                ->paginate(10),
            'subscription' => auth()->check() ? Subscription::query()->where([
                ['subscriber_id', '=', $request->user()->id],
                ['subscribable_id', '=', $thread->id],
                ['subscribable_type', '=', $thread->getMorphClass()],
            ])->first() : null
        ]);
    }

    public function edit(Thread $thread): Response
    {
        return Inertia::render('Threads/Edit', [
            'thread' => $thread,
        ]);
    }

    public function update(Request $request, Thread $thread): RedirectResponse
    {
        //TODO: thread bump without manual post?
        $request->validate([
            'title' => 'required|min:5',
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
