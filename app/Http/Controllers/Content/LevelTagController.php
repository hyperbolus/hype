<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Tag;
use App\Models\Game\Level;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LevelTagController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tags/Index', [
            'tags' => Tag::all(),
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'tag' => 'required',
        ]);

        $tag = new Tag();
        $tag->name = $request->string('tag');
        $tag->model = (new Level())->getMorphClass();
        $tag->save();

        return back();
    }

    public function show(Tag $tag): Response
    {
        return Inertia::render('Tags/Show', [
            'levels' => $tag->levels()->paginate(10),
            'tag' => $tag,
        ]);
    }

    public function edit(Tag $levelTag)
    {
        //
    }

    public function update(Request $request, Tag $levelTag)
    {
        //
    }

    public function destroy(Tag $levelTag)
    {
        //
    }
}
