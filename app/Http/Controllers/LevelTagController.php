<?php

namespace App\Http\Controllers;

use App\Models\Content\CrowdTag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LevelTagController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tags/Index', [
            'tags' => CrowdTag::all()
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

        $tag = new CrowdTag();
        $tag->name = $request->string('tag');
        $tag->save();

        return back();
    }

    public function show(CrowdTag $tag): Response
    {
        return Inertia::render('Tags/Show', [
            'levels' => $tag->levels()->paginate(10),
            'tag' => $tag
        ]);
    }

    public function edit(CrowdTag $levelTag)
    {
        //
    }

    public function update(Request $request, CrowdTag $levelTag)
    {
        //
    }

    public function destroy(CrowdTag $levelTag)
    {
        //
    }
}
