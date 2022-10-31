<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\LevelTag;
use App\Models\LevelTagVote;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LevelTagVoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Levels/Tags', [
            'tags' => LevelTag::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Level $level)
    {
        $request->validate([
            'tag_id' => [
                'required',
                'exists:App\Models\LevelTag,id',
                Rule::unique('App\Models\LevelTagVote')->where(function ($query) use($request, $level) {
                    return $query->where('level_id', $level->id)
                        ->where('tag_id', $request->tag_id)
                        ->where('user_id', $request->user()->id);
                })
            ]
        ], [
            'tag_id.unique' => 'This tag has already been added and you have already voted on it'
        ]);

        if(!$level->tags()->where('level_tag_id', '=', $request->tag_id)->first()) {
            $level->tags()->save(LevelTag::query()->find($request->tag_id));
        }

        $vote = new LevelTagVote();
        $vote->level_id = $level->id;
        $vote->tag_id = $request->tag_id;
        $vote->user_id = $request->user()->id;
        $vote->approved = $request->approve;
        $vote->save();


        // https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/bayesian-average/
        $this_upvotes = LevelTagVote::query()
            ->where('level_id', '=', $level->id)
            ->where('tag_id', '=', $request->tag_id)
            ->where('approved', '=', 1)
            ->count();
        $this_votes = LevelTagVote::query()
            ->where('level_id', '=', $level->id)
            ->where('tag_id', '=', $request->tag_id)
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

        $level->tags()->updateExistingPivot($request->tag_id, [
            'score' => $score
        ], 1);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LevelTagVote  $levelTagVote
     * @return \Illuminate\Http\Response
     */
    public function show(LevelTagVote $levelTagVote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LevelTagVote  $levelTagVote
     * @return \Illuminate\Http\Response
     */
    public function edit(LevelTagVote $levelTagVote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LevelTagVote  $levelTagVote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LevelTagVote $levelTagVote)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LevelTagVote  $levelTagVote
     * @return \Illuminate\Http\Response
     */
    public function destroy(LevelTagVote $levelTagVote)
    {
        //
    }
}
