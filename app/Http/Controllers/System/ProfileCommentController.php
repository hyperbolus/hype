<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\ProfileComment;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProfileCommentController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'body' => 'required|max:140',
            'user_id' => 'required|exists:App\Models\System\User,id'
        ]);

        $comment = new ProfileComment();
        $comment->user_id = $request->integer('user_id');
        $comment->commenter_id = auth()->id();
        $comment->body = $request->string('body');
        $comment->save();

        return redirect()->back();
    }

    public function update(Request $request, ProfileComment $profileComment)
    {
        //
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy(ProfileComment $comment): RedirectResponse
    {
        $this->authorize('destroy', $comment);

        $comment->delete();

        return back();
    }
}
