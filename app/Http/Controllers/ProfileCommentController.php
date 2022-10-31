<?php

namespace App\Http\Controllers;

use App\Models\ProfileComment;
use Illuminate\Http\Request;

class ProfileCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $comment = new ProfileComment();
        $comment->user_id = $request->user_id;
        $comment->commenter_id = $request->user()->id;
        $comment->body = $request->body;
        $comment->save();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProfileComment  $profileComment
     * @return \Illuminate\Http\Response
     */
    public function show(ProfileComment $profileComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ProfileComment  $profileComment
     * @return \Illuminate\Http\Response
     */
    public function edit(ProfileComment $profileComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProfileComment  $profileComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProfileComment $profileComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProfileComment  $profileComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProfileComment $profileComment)
    {
        //
    }
}
