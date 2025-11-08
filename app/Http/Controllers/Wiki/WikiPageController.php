<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Models\ModelRevision;
use App\Models\RevisionText;
use App\Models\WikiPage;
use App\Wiki;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class WikiPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'language' => ['required', 'string', Rule::in(array_keys(Wiki::$languages))],
            'namespace' => ['required', 'string', Rule::in(array_keys(Wiki::$namespaces))],

            'content' => ['required', 'string'],

            'description' => ['required', 'string'],
        ]);

        $ns = $request->string('namespace')->toString();
        $title = $request->string('title')->toString();
        $lang = $request->string('language')->toString();

        // Create page stub first
        // TODO@later: logic for linking root and parent pages etc
        $page = new WikiPage();
        $page->title = $title;
        $page->namespace = Wiki::$namespaces[$ns];
        $page->lang = Wiki::$languages[$lang];
        $page->save();

        // Create initial revision
        $revision = new ModelRevision();
        $revision->author_id = $request->user()->id;
        $revision->model_type = 70;
        $revision->model_id = $page->id;
        $revision->description = $request->string('description');
        $revision->save();

        // Store the page content
        $text = new RevisionText();
        $text->revision_id = $revision->id;
        $text->content = $request->string('content');
        $text->new_length = $request->string('content')->length();
        $text->old_length = 0;
        $text->save();

        // Assign our new initial revision to the page
        $page->length = $request->string('content')->length();
        $page->revision_id = $revision->id;
        $page->save();

        $path = $lang . '/';
        if ($ns !== 'Page') $path .= $ns . ':';
        $path .= $title;

        return redirect()->route('wiki', $path);
    }

    public function random(Request $request): RedirectResponse
    {
        $page = WikiPage::query()
            ->where('lang', Wiki::$languages[$request->string('lang')->toString()])
            ->inRandomOrder()
            ->firstOrFail();

        return redirect()->route('wiki', $page->getURL());
    }

    public function show(Request $request, string $path = '')
    {
        $revision = null;
        $revisions = null;
        $article = null;
        $action = $request->string('action', 'read')->toString();

        [
            'lang' => $lang,
            'namespace' => $namespace,
            'title' => $title,
            'redirect' => $redirect,
        ] = Wiki::parsePath($path);

        if ($namespace === 'Revision') {
            // We actually want the opposite because the URI we're aiming for would typically redirect
            if (!$redirect) return redirect()->route('wiki', 'Revision:' . $title);

            $revision = ModelRevision::query()
                ->where('model_type', 70)
                ->where('id', $title)
                ->with(['model', 'text', 'author'])
                ->firstOrFail();

            $lang = array_search($revision->lang, Wiki::$languages);
            $namespace = array_search($revision->namespace, Wiki::$namespaces);
            $title = $revision->model->title;

            $article = $revision->model;
            // remove redundant data due to our weird structuring
            $revision->makeHidden('model');

        } else {
            if ($redirect) return redirect()->route('wiki', $redirect);

            $article = WikiPage::query()
                ->where('lang', Wiki::$languages[$lang])
                ->where('namespace', Wiki::$namespaces[$namespace])
                ->where('title', $title)
                ->first();

            if ($action === 'history') {
                // include revision history
                $revisions = $article?->revisions()
                    ->with(['author', 'size'])
                    ->latest()
                    ->paginate(25);
            } else {
                // If viewing or editing grab the latest revision
                $revision = $article->revision()->with(['text'])->first();
            }
        }

        return page('Wiki/Show', [
            'page' => $article,
            'revision' => $revision,
            'revisions' => $revisions,

            'path' => $path,
            'title' => $title,
            'language' => $lang,
            'namespace' => $namespace,

            'action' => $action,
        ])->meta($title, 'CHANGE ME')
            ->breadcrumbs([crumb('Wiki', route('wiki'))]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WikiPage $wikiPage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WikiPage $page)
    {
        $request->validate([
            'content' => ['required', 'string'],
            'description' => ['required', 'string'],
        ]);

        $lang = array_search($page->lang, Wiki::$languages);
        $ns = array_search($page->namespace, Wiki::$namespaces);

        $revision = new ModelRevision();
        $revision->author_id = $request->user()->id;
        $revision->model_type = 70;
        $revision->model_id = $page->id;
        $revision->description = $request->string('description');
        $revision->save();

        $text = new RevisionText();
        $text->revision_id = $revision->id;
        $text->content = $request->string('content');
        $text->new_length = $request->string('content')->length();
        $text->old_length = $page->length;
        $text->save();

        // Assign our new initial revision to the page
        $page->length = $request->string('content')->length();
        $page->revision_id = $revision->id;
        $page->save();

        $path = $lang . '/';
        if ($ns !== 'Page') $path .= $ns . ':';
        $path .= $page->title;

        return redirect()->route('wiki', $path);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WikiPage $wikiPage)
    {
        //
    }
}
