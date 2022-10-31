<?php

namespace App\Http\Controllers;

use App\Models\ReputationLog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReputationLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param $id
     * @return Response
     */
    public function index($id): Response
    {
        $user = User::query()->find($id);
        if ($user === null) {
            abort(404);
        }
        return Inertia::render('Users/Reputation', [
            'profile' => $user,
            'reps' => ReputationLog::whereRecipientId($id)->with('sender')->paginate(25)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ReputationLog  $reputationLog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReputationLog $reputationLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReputationLog  $reputationLog
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReputationLog $reputationLog)
    {
        //
    }
}
