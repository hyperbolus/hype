<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\ReputationLog;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        $user->recalculateReputation();
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
