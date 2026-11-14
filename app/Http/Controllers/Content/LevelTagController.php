<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Content\Tag;
use App\Models\Game\Level;
use App\Models\WikiPage;
use App\Wiki;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LevelTagController extends Controller
{
    public function index(): Responsable
    {
        return page('Tags/Index', [
            'tags' => Tag::query()->withCount(['levels'])->get(),
        ])->meta('Level Tags', 'Browse levels by tag');
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

    public function show(Tag $tag): Responsable
    {
        return page('Tags/Show', [
            // TODO: Add filters
            'article' => Wiki::getPage($tag->id, namespace: 'Tag'),
            'levels' => $tag->levels()
                ->withCount('reviews')
                ->paginate(10),
            'tag' => $tag,
        ])->meta($tag->name, 'View levels tagged as ' . $tag->name);
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
