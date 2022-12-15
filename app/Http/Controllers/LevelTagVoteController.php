<?php

namespace App\Http\Controllers;

use App\Models\Content\CrowdTag;
use App\Models\Content\CrowdTagVote;
use App\Models\GeometryDash\Level;
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
            'tags' => CrowdTag::all(),
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
                'exists:App\Models\LevelTag,id',
                Rule::unique('App\Models\Content\CrowdTagVote')->where(function ($query) use($request, $level) {
                    return $query->where('level_id', $level->id)
                        ->where('tag_id', $request->integer('tag_id'))
                        ->where('user_id', auth()->id());
                })
            ]
        ], [
            'tag_id.unique' => 'This tag has already been added and you have already voted on it'
        ]);

        if(!$level->tags()->where('level_tag_id', '=', $request->integer('tag_id'))->first()) {
            $level->tags()->save(CrowdTag::query()->find($request->integer('tag_id')));
        }

        $vote = new CrowdTagVote();
        $vote->level_id = $level->id;
        $vote->tag_id = $request->integer('tag_id');
        $vote->user_id = $request->user()->id;
        $vote->approved = $request->boolean('approved');
        $vote->save();


        // https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/bayesian-average/
        $this_upvotes = CrowdTagVote::query()
            ->where('level_id', '=', $level->id)
            ->where('tag_id', '=', $request->integer('tag_id'))
            ->where('approved', '=', true)
            ->count();
        $this_votes = CrowdTagVote::query()
            ->where('level_id', '=', $level->id)
            ->where('tag_id', '=', $request->integer('tag_id'))
            ->count();

        $all_avg = 0.25; // Assume this for now

        // Lower quartile 25%
        $confidence = 15; // placeholder

        $score = ($this_upvotes + $confidence * $all_avg) / ($this_votes + $confidence);

        clock([
            'score' => $score,
            'tag_upvotes' => $this_upvotes,
            'tag_average' => $this_upvotes / $this_votes,
            'tag_votes' => $this_votes,
            'total_average' => $all_avg,
        ]);

        $level->tags()->updateExistingPivot($request->integer('tag_id'), [
            'score' => $score
        ], 1);

        return back();
    }

    public function show(CrowdTagVote $levelTagVote)
    {
        //
    }

    public function edit(CrowdTagVote $levelTagVote)
    {
        //
    }

    public function update(Request $request, CrowdTagVote $levelTagVote)
    {
        //
    }

    public function destroy(CrowdTagVote $levelTagVote)
    {
        //
    }
}
