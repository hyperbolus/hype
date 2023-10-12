<?php

namespace App\Http\Controllers\Game;

use App\Actions\Hydrate;
use App\Actions\MacroMetadata;
use App\Http\Controllers\Controller;
use App\Models\Game\LevelReplay;
use App\Models\Media;
use App\Models\System\User;
use Closure;
use Hashids\Hashids;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;

class LevelReplayController extends Controller
{
    public function index(Request $request): Responsable
    {
        $query = User::query()->withCount(['replays'])->has('replays', '>', 0);

        $replays = LevelReplay::query()
            ->with(['level', 'author', 'files']);

        $replays->whereNotNull('created_at');

        if ($request->has('format') && $request->string('format')->isNotEmpty()) {
            $replays->whereIn('format', explode(',', $request->string('format', 'mhr')));
        }

        if ($request->has('user_id') && $request->string('user_id')->isNotEmpty()) {
            $replays->where('submitter_id', '=', $request->integer('user_id'));
        }

        if ($request->has('level_id') && $request->string('level_id')->isNotEmpty()) {
            $replays->where('level_id', '=', $request->integer('level_id'));
        }

        $replays = $replays->orderBy('created_at', 'DESC')
            ->paginate()
            ->withQueryString()
            ->through(function (LevelReplay $replay) {
                $replay->files->transform(function (Media $media) {
                    $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
                    $result = $hashids->encode([$media->id, 0]);
                    $media->setAttribute('url', route('download', $result));
                    return $media;
                });
                return $replay;
            });

        return page('Replays/Index', [
            'leaderboard' => $query->orderBy('replays_count', 'DESC')->limit(25)->get(),
            'participants' => $query->count(),
            'approved' => LevelReplay::query()->whereNotNull('approved_at')->count(),
            'unapproved' => LevelReplay::query()->whereNull('approved_at')->count(),
            'replays' => $replays
        ])->meta('Replay Archive (WIP)', 'Work in progress, attempt at building a public database of level replays');
    }

    public function create(): Responsable
    {
        //return redirect()->route('replays.index');

        return page('Replays/Create', [])
            ->meta('Upload Macro', 'Upload a new macro');
    }

    public function store(Request $request): RedirectResponse
    {
        $level = Hydrate::level($request->integer('level_id'));

        $request->validate([
            'file' => [
                'required',
                'max:16000',
                function (string $attribute, UploadedFile $value, Closure $fail) {
                    if (!in_array($value->getClientOriginalExtension(), ['replay', 'zbot', 'dat', 'ddhor', 'xbot', 'kd', 'zbf', 'xbot', 'rsh', 'json', 'mhr'])) {
                        $fail('This file type is invalid.');
                    }
                },
            ],

        ]);

        $replay = new LevelReplay();
        $replay->submitter_id = $request->user()->id;
        $replay->level_id = $level->id;
        $replay->format = $request->string('format');
        $replay->notes = $request->string('notes');
        $replay->coins = $request->integer('coins');
        $replay->fps = MacroMetadata::only($replay, $request->file('file')->get(), false);
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
