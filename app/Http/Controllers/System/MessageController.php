<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\Message;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(Request $request): Response
    {
        // TODO: Figure out how to get the latest message so the client knows which conversations have unread messages
        $conversations = Message::query()->from('messages AS t1')->whereRaw('(sender_id = '.$request->user()->id.' OR recipient_id = '.$request->user()->id.') AND created_at = ( SELECT MAX(created_at) FROM messages AS t2 WHERE t1.a = t2.a AND t1.b = t2.b LIMIT 1 )')->orderByDesc('created_at')->with(['sender', 'recipient'])->paginate(25);

        return Inertia::render('Inbox/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function create(): Response
    {
        $id = \request('to') ?? null;
        $user = null;
        if ($id && $id != auth()->id()) {
            $user = User::query()->find($id);
        }

        return Inertia::render('Inbox/Create', [
            'recipient' => $user,
        ]);
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

        $msg = new Message();
        $msg->sender_id = auth()->id();
        $msg->recipient_id = $request->integer('recipient_id');
        $msg->body = $request->string('body');
        $msg->save();

        return redirect()->route('inbox.show', $request->input('recipient_id'));
    }

    public function show(Request $request, $id): Response
    {
        $user = User::query()->findOrFail($id);

        $messages = Message::query()->where($request->user()->id < $id ? 'a' : 'b', '=', $request->user()->id)->where($request->user()->id > $id ? 'a' : 'b', '=', $id)->paginate(25);

        foreach ($messages->items() as $message) {
            if($message->recipient_id === auth()->id()) {
                $message->read_at = now();
                $message->save();
            }
        }

        return Inertia::render('Inbox/Show', [
            'messages' => $messages,
            'recipient' => $user,
        ]);
    }

    public function edit(Message $message)
    {
        //
    }

    public function update(Request $request, Message $message)
    {
        //
    }

    public function destroy(Message $message)
    {
        //
    }
}
