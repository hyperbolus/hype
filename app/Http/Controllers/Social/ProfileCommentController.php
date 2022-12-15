<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use App\Models\Social\ProfileComment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProfileCommentController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        // TODO: validate
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

    public function destroy(ProfileComment $profileComment)
    {
        //
    }
}
