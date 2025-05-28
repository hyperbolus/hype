<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\ReputationLog;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class ReputationLogController extends Controller
{
    public function index(Request $request, User $user): Response
    {
        $rep = null;

        if (auth()->check()) {
            $rep = ReputationLog::query()
                ->where('sender_id', $request->user()->id)
                ->where('recipient_id', $user->id)
                ->first();
        }

        return Inertia::render('Users/Reputation', [
            'profile' => $user,
            'reps' => ReputationLog::query()
                ->where('recipient_id', $user->id)
                ->with('sender')
                ->paginate(25),
            'rep' => $rep,
        ]);
    }

    public function store(Request $request, User $user): RedirectResponse
    {
        $range = ['max:1', 'min:-1'];

        if ($request->user()->hasRole('admin')) $range = ['max:3', 'min:-3'];

        $request->validate([
            'reason' => ['required', 'max:250'],
            'reputation' => ['required', 'integer', ...$range],
        ]);

        ReputationLog::query()->updateOrCreate([
            'sender_id' => $request->user()->id,
            'recipient_id' => $user->id,
        ], [
            'reputation' => $request->integer('reputation'),
            'reason' => $request->string('reason'),
        ]);

        $old = $user->reputation;
        $user->recalculateReputation();


        if ($old > -10 && $user->reputation < -10) {
            Http::post(config('hyperbolus.staff_webhook_url'), [
                "embeds" => [
                    [
                        "title" => 'Low Reputation Alert',
                        "description" => 'A user has recently received a high amount of negative reps',
                        "color" => 12648430,
                        "author" => [
                            "name" => "System (#0)"
                        ],
                        "fields" => [
                            [
                                "name" => "ID",
                                "value" => $user->id,
                                "inline" => true
                            ],
                            [
                                "name" => "Name",
                                "value" => $user->name,
                                "inline" => true
                            ],
                            [
                                "name" => "Rep",
                                "value" => $user->reputation,
                                "inline" => true
                            ],
                            [
                                "name" => "Creation Date",
                                "value" => $user->created_at->toDateString(),
                                "inline" => true
                            ],
                            [
                                "name" => "Last Seen",
                                "value" => "<t:" . $user->last_seen->timestamp . ":f>",
                                "inline" => true
                            ],
                            [
                                "name" => "Actions",
                                "value" => "[Profile](" . route('users.show', $user->id) . ") • [Mod View](" . route('moderation.users.show', $user->id) . ") • [System View](" . route('system.users.show', $user->id) . ")",
                                "inline" => false
                            ],
                        ],
                        "footer" => [
                            "text" => "Hype"
                        ],
                        "timestamp" => now()
                    ]
                ],
                "components" => []
            ]);
        }

        $user->save();

        return back();
    }

    public function update(Request $request, ReputationLog $reputationLog)
    {
        //
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        $rep = ReputationLog::query()
            ->where('sender_id', $request->user()->id)
            ->where('recipient_id', $user->id)
            ->first();

        if ($rep) {
            $rep->delete();

            $user->recalculateReputation();
            $user->save();
        }

        return back();
    }
}
