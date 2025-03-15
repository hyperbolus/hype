<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Post;
use App\Models\Content\Thread;
use App\Models\System\Subscription;
use App\Notifications\ThreadReplied;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Notification;

class PostController extends Controller
{
    public function create()
    {
        //
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'body' => 'required|min:20',
        ]);

        /**
         * @var Thread $thread
         */
        $thread = Thread::query()->findOrFail($request->integer('thread_id'));

        // TODO: Move to policy
        if ($thread->locked && !$request->user()->hasRole('admin')) {
            throw \Illuminate\Validation\ValidationException::withMessages(['forum' => 'This thread is currently locked']);
        }

        $post = new Post();
        $post->signature = $request->boolean('signature');
        $post->thread_id = $request->integer('thread_id');
        $post->forum_id = $thread->forum_id;
        $post->author_id = $request->user()->id;
        $post->body = $request->string('body');
        $post->save();

        $thread->last_activity_at = now();
        $thread->save(['timestamps' => false]);

        // Make sure notification is sent BEFORE the new subscription is created
        // TODO: Find a way to do this without separate collections
        $subscribers = $thread->subscribers()
            ->whereNot('subscriber_id', '=', $request->user()->id)
            ->where('subscriptions.email', '=', false)
            ->get();
        Notification::send($subscribers, new ThreadReplied($thread, $post, $request->user(), false));

        $subscribers = $thread->subscribers()
            ->whereNot('subscriber_id', '=', $request->user()->id)
            ->where('subscriptions.email', '=', true)
            ->get();
        Notification::send($subscribers, new ThreadReplied($thread, $post, $request->user(), true));

        // TODO: (partial) duplicate from ThreadController, maybe move somewhere else?
        if ($request->boolean('watch')) {
            Subscription::updateOrCreate([
                'subscriber_id' => $request->user()->id,
                'subscribable_id' => $thread->id,
                'subscribable_type' => $thread->getMorphClass(),
            ], [
                'email' => $request->has('watch_email') ? $request->boolean('watch_email') : null,
            ]);
        } else {
            Subscription::query()->where([
                ['subscriber_id', '=', $request->user()->id],
                ['subscribable_id', '=', $thread->id],
                ['subscribable_type', '=', $thread->getMorphClass()],
            ])->delete();
        }

        return back();
    }

    public function show(Post $post)
    {
        $post->load(['thread', 'thread.forum', 'thread.author', 'author', 'media', 'reactions', 'reactions.reacter']);
        // TODO: Either highlighted or go to page (both prolly)
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function edit(Post $post): \Inertia\Response
    {
        $this->authorize($post);

        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    /**
     * @throws AuthorizationException
     */
    public function update(Request $request, Post $post): RedirectResponse
    {
        $this->authorize($post);

        $request->validate([
            'body' => 'required|min:20',
        ]);
        $post->signature = $request->boolean('signature');
        $post->body = $request->string('body');
        $post->save();

        return redirect()->route('posts.show', $post->id);
    }

    public function destroy(Request $request, Post $post)
    {
        $request->validate([
            'user_id' => '',
        ]);
    }
}
