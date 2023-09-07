<?php

namespace App\Http\Controllers\Game;

use App\Actions\Hydrate;
use App\Http\Controllers\Controller;
use App\Models\Game\LevelReplay;
use App\Models\Media;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LevelReplayController extends Controller
{
    public function index(): Responsable
    {
        $query = User::query()->withCount(['replays'])->has('replays', '>', 0);

        return page('Replays/Index', [
            'leaderboard' => $query->orderBy('replays_count', 'DESC')->limit(25)->get(),
            'participants' => $query->count(),
            'approved' => LevelReplay::query()->whereNotNull('approved_at')->count(),
            'unapproved' => LevelReplay::query()->whereNull('approved_at')->count(),
        ])->meta('Replay Archive (WIP)', 'Work in progress, attempt at building a public database of level replays')
            ->breadcrumbs([
                [
                    'text' => 'Replays Archive (WIP)',
                    'url' => '/replays',
                ]
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

    public function store(Request $request): RedirectResponse
    {
        $level = Hydrate::level($request->integer('level_id'));

        $request->validate([
            'file' => 'required|max:16000',
        ]);

        $replay = new LevelReplay();
        $replay->submitter_id = $request->user()->id;
        $replay->level_id = $level->id;
        $replay->format = $request->string('format');
        $replay->save();

        $file = new Media();
        $file->path = Storage::disk('contabo')->putFile('macros', $request->file('file'), 'public');
        $file->filename = $request->file('file')->getClientOriginalName();
        $file->bytes = $request->file('file')->getSize();
        $file->owner_id = $replay->id;
        $file->owner_type = 41;
        $file->save();

        return redirect()->route('levels.show', $level->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LevelReplay  $levelReplay
     * @return \Illuminate\Http\Response
     */
    public function show(LevelReplay $levelReplay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LevelReplay  $levelReplay
     * @return \Illuminate\Http\Response
     */
    public function edit(LevelReplay $levelReplay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LevelReplay  $levelReplay
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LevelReplay $levelReplay)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LevelReplay  $levelReplay
     * @return \Illuminate\Http\Response
     */
    public function destroy(LevelReplay $levelReplay)
    {
        //
    }
}
