<?php

namespace App\Http\Controllers;

use App\Models\ReputationLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReputationLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request, $id)
    {
        return Inertia::render('Reputation/Index', [
            'entries' => ReputationLog::where('recipient_id', '=', $id)->with('sender')->get()
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReputationLog  $reputationLog
     * @return \Illuminate\Http\Response
     */
    public function show(ReputationLog $reputationLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReputationLog  $reputationLog
     * @return \Illuminate\Http\Response
     */
    public function edit(ReputationLog $reputationLog)
    {
        //
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
