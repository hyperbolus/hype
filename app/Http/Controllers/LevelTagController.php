<?php

namespace App\Http\Controllers;

use App\Models\LevelTag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LevelTagController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tags/Index', [
            'tags' => LevelTag::all()
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'tag' => 'required'
        ]);

        $tag = new LevelTag();
        $tag->name = $request->string('tag');
        $tag->save();

        return back();
    }

    public function show(LevelTag $tag): Response
    {
        return Inertia::render('Tags/Show', [
            'levels' => $tag->levels()->paginate(10),
            'tag' => $tag
        ]);
    }

    public function edit(LevelTag $levelTag)
    {
        //
    }

    public function update(Request $request, LevelTag $levelTag)
    {
        //
    }

    public function destroy(LevelTag $levelTag)
    {
        //
    }
}
