<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\ReputationLog;
use App\Models\System\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReputationLogController extends Controller
{
    public function index($id): Response
    {
        $user = User::query()->findOrFail($id);

        return Inertia::render('Users/Reputation', [
            'profile' => $user,
            'reps' => ReputationLog::whereRecipientId($id)->with('sender')->paginate(25)
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, ReputationLog $reputationLog)
    {
        //
    }

    public function destroy(ReputationLog $reputationLog)
    {
        //
    }
}
