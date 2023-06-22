<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\CrowdVote;
use App\Models\Content\Tag;
use App\Models\Game\Level;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class LevelTagVoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Levels/Tags', [
            'tags' => Tag::all(),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request, Level $level): RedirectResponse
    {
        $request->validate([
            'tag_id' => [
                'required',
                'exists:tags,id',
                Rule::unique('crowd_votes', 'votable_id')->ignore($request->integer('tag_id'), 'votable_id')->where(function ($query) use ($request, $level) {
                    return $query->where('user_id', auth()->id())
                        ->where('related_id', $level->id)
                        ->where('related_type', 40)
                        ->where('votable_id', $request->integer('tag_id'))
                        ->where('votable_type', 11);
                }),
            ],
        ], [
            'tag_id.unique' => 'This tag has already been added and you have already voted on it',
        ]);

        $tag = Tag::query()->find($request->integer('tag_id'));

        if ($request->has('verify')) {
            /**
             * @type User $user
             */
            $user = auth()->user();
            if (!$user->hasRole('admin')) {
                abort(401);
            } else {
                $level->tags()->updateExistingPivot($request->integer('tag_id'), [
                    // TODO: have ability to vote true false or null for verify. false means explicit reject
                    'verified' => $request->boolean('verify') ? true : null
                ]);
            }

            return back();
        }

        // TODO: when making this poly I forgot to add the other columns to this check
        if (! $level->tags()->where('tag_id', '=', $request->integer('tag_id'))->first()) {
            $level->tags()->save($tag);
        }

        // TODO: ChatGPT'd. Make sure it actually is sound.
        CrowdVote::query()->updateOrCreate([
            'user_id' => $request->user()->id,
            'related_id' => $level->id,
            'related_type' => $level->getMorphClass(),
            'votable_id' => $tag->id,
            'votable_type' => $tag->getMorphClass(),
        ], [
            'approved' => $request->boolean('approved'),
        ]);

        // https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/bayesian-average/
        $this_upvotes = CrowdVote::query()
            ->where('related_id', '=', $level->id)
            ->where('related_type', '=', 40)
            ->where('votable_id', '=', $request->integer('tag_id'))
            ->where('votable_type', '=', 11)
            ->where('approved', '=', true)
            ->count();
        $this_votes = CrowdVote::query()
            ->where('related_id', '=', $level->id)
            ->where('related_type', '=', 40)
            ->where('votable_id', '=', $request->integer('tag_id'))
            ->where('votable_type', '=', 11)
            ->count();

        $all_avg = 0.25; // Assume this for now

        // Lower quartile 25%
        $confidence = 15; // placeholder

        $score = ($this_upvotes + $confidence * $all_avg) / ($this_votes + $confidence);

        $level->tags()->updateExistingPivot($request->integer('tag_id'), [
            'score' => $score,
        ]);

        return back();
    }

    public function show(CrowdVote $vote)
    {
        //
    }

    public function edit(CrowdVote $vote)
    {
        //
    }

    public function update(Request $request, CrowdVote $vote)
    {
        //
    }

    public function destroy(CrowdVote $vote)
    {
        //
    }
}
