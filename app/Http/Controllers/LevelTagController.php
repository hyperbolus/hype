<?php

namespace App\Http\Controllers;

use App\Models\LevelTag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LevelTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Tags/Index', [
            'tags' => LevelTag::all()
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
     * @param LevelTag $tag
     * @return Response
     */
    public function show(LevelTag $tag): Response
    {
        return Inertia::render('Tags/Show', [
            'levels' => $tag->levels()->paginate(10),
            'tag' => $tag
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param LevelTag $levelTag
     * @return \Illuminate\Http\Response
     */
    public function edit(LevelTag $levelTag)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param LevelTag $levelTag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LevelTag $levelTag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param LevelTag $levelTag
     * @return \Illuminate\Http\Response
     */
    public function destroy(LevelTag $levelTag)
    {
        //
    }
}
