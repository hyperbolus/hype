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
    public function index()
    {
        return page('News', [
            'articles' => Article::query()->latest()->paginate()
        ]);
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

    }

    public function show(Article $article): Responsable
    {
        return page('Articles/Show', [
            'article' => $article->load(['post']),
            'articles' => Article::query()
                ->whereNot('id', '=', $article->id)
                ->limit(3)
                ->get()
        ])->meta($article->title, $article->blurb ?? 'Read articles and news on Hyperbolus');
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
