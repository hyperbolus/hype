<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Post;
use App\Models\Content\Reaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function store(Request $request, Post $post): RedirectResponse
    {
        // TODO: validate, no dupes
        $reaction = Reaction::query()->where('reacter_id', $request->user()->id)->where('reactable_id', $post->id)->where('reactable_type', $post->getMorphClass())->first();
        if ($reaction) {
            $reaction->delete();
        } else {
            $reaction = new Reaction();
            $reaction->reacter_id = $request->user()->id;
            $reaction->reactable_id = $post->id;
            $reaction->reactable_type = $post->getMorphClass();
            $reaction->emote = 1;
            $reaction->save();
        }

        return redirect()->back();
    }

    public function edit(Reaction $postLike)
    {
        //
    }

    public function destroy(Reaction $postLike)
    {
        //
    }
}
