<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request): \Inertia\Response
    {
        $conversations = Message::query()->from('messages AS t1')->whereRaw('(sender_id = ' . $request->user()->id . ' OR recipient_id = ' . $request->user()->id . ') AND created_at = ( SELECT MAX(created_at) FROM messages AS t2 WHERE t1.a = t2.a AND t1.b = t2.b LIMIT 1 )')->orderByDesc('created_at')->with(['sender', 'recipient'])->paginate(25);

        return Inertia::render('Inbox/Index', [
            'conversations' => $conversations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): \Inertia\Response
    {
        $id = \request('to') ?? null;
        $user = null;
        if ($id && $id != auth()->user()->id) {
            $user = User::query()->find($id);
        }

        return Inertia::render('Inbox/Create', [
            'recipient' => $user,
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
        $validator = Validator::make($request->input(), [
            'recipient_id' => 'required|exists:App\Models\User,id|not_in:'.$request->user()->id,
            'body' => 'required'
        ]);
        $validator->setAttributeNames([
            'recipient_id' => 'recipient',
            'body' => 'message'
        ]);
        $validator->validate();

        $msg = new Message();
        $msg->sender_id = $request->user()->id;
        $msg->recipient_id = $request->recipient_id;
        $msg->body = $request->body;
        $msg->save();

        return redirect()->route('inbox.show', $request->recipient_id);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function show(Request $request, $id): \Inertia\Response
    {
        $user = User::query()->find($id);
        if ($user === null) {
            abort(404);
        }

        $messages = Message::query()->where($request->user()->id < $id ? 'a' : 'b', '=', $request->user()->id)->where($request->user()->id > $id ? 'a' : 'b', '=', $id)->paginate(25);

        return Inertia::render('Inbox/Show', [
            'messages' => $messages,
            'recipient' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Message $message
     * @return Response
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Message $message
     * @return Response
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Message $message
     * @return Response
     */
    public function destroy(Message $message)
    {
        //
    }
}
