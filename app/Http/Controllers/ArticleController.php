<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Responsable
    {
        $results = Article::query()->latest()->get(['id', 'title', 'slug', 'created_at']);

        $archive = [];

        foreach ($results as $result) {
            $year = $result->created_at->year;
            $month = $result->created_at->month;

            if (!array_key_exists($year, $archive)) $archive[$year] = [];
            if (!array_key_exists($month, $archive[$year])) $archive[$year][$month] = [];

            $archive[$year][$month][] = $result;
        }

        return page('News', [
            'articles' => Article::query()->latest()->paginate(),
            'archive' => $archive,
            'tags' => []
        ])->meta('News', 'View the latest stories from the Geometry Dash community');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Responsable
    {
        return page('Articles/Create')
            ->meta('Create Article', 'Submit your hot takes');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // add slug check in db
        // should slug be globally unique or unique to dated SEO url?
        $request->validate([
            'title' => ['required'],
            'content' => ['required']
        ]);

        $article = new Article();
        $article->title = $request->string('title');
        if ($request->has('slug')) $article->slug = $request->string('slug');
        $article->content = $request->string('content');
        $article->author_id = $request->user()->id;
        $article->save();

        return redirect()->route('articles.show', $article->slug);
    }

    public function show(Article $article): Responsable
    {
        return page('Articles/Show', [
            'article' => $article->load(['post']),
            'articles' => Article::query()
                ->whereNot('id', '=', $article->id)
                ->limit(3)
                ->get()
        ])->meta($article->title, $article->blurb ?? 'Read articles and news on Hyperbolus')
            ->breadcrumbs([crumb('News', route('news'))]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
