<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\Message;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class MessageController extends Controller
{
    public function show(Request $request, User $user = null): Responsable
    {
        $id = $request->user()->id;

        if ($id === $user->id) abort(400);

        $messages = [];

        if ($user) {
            $messages = Message::query()
                ->where($id < $user->id ? 'a' : 'b', '=', $id)
                ->where($id > $user->id ? 'a' : 'b', '=', $user->id)
                ->latest()
                ->paginate(10)
                ->setPageName('');

            Message::query()
                ->where('sender_id', $user->id)
                ->where('recipient_id', $id)
                ->update(['read_at' => now()]);
        }

        $conversations = Message::query()
            ->from('messages AS t1')
            ->whereRaw("(sender_id = {$id} OR recipient_id = {$id}) AND created_at = ( SELECT MAX(created_at) FROM messages AS t2 WHERE t1.a = t2.a AND t1.b = t2.b LIMIT 1 )")
            ->orderByDesc('created_at')
            ->with(['sender', 'recipient'])
            ->paginate(25, ['*'], 'inbox_page')
            ->withPath(route('inbox.index'));

        $unread = [];

        foreach ($conversations->items() as $convo) $unread[] = $convo->id;

        $unread = Message::query()
            ->where('recipient_id', $request->user()->id)
            ->whereNull('read_at')
            ->whereIn('id', $unread)
            ->get()
            ->keyBy('id');

        return page('Chat', [
            'conversations' => $conversations,
            'unread' => $unread,
            'messages' => $messages,
            'recipient' => $user
        ])->meta($user ? 'Conversation with ' . $user->name : 'Messages', 'Chat with other users on Hyperbolus')
            ->breadcrumbs($user ? [crumb('Inbox', route('inbox.index'))] : []);
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validator = Validator::make($request->input(), [
            'recipient_id' => 'required|exists:users,id|not_in:'.$request->user()->id,
            'body' => 'required',
        ]);

        $validator->setAttributeNames([
            'recipient_id' => 'recipient',
            'body' => 'message',
        ]);

        $validator->validate();

        if ($request->user()->id === $request->integer('recipient_id')) abort(400);

        $msg = new Message();
        $msg->sender_id = $request->user()->id;
        $msg->recipient_id = $request->integer('recipient_id');
        $msg->body = $request->string('body');
        $msg->save();

        return redirect()->route('inbox.show', $request->input('recipient_id'));
    }

    public function update(Request $request, Message $message)
    {
        //
    }

    public function destroy(Request $request, Message $message): JsonResponse
    {
        if ($message->sender_id !== $request->user()->id) abort(403);

        $message->delete();

        return response('', 200)->json();
    }
}
