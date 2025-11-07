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
        $matches = [];
        preg_match(
            '/(?:(?<lang>[a-zA-Z0-9_]*?)\/)?(?:(?<ns>[a-zA-Z0-9_]*):)?(?<page>[a-zA-Z0-9_]*)(?:\/(?<path>.*))?/',
            $path,
            $matches
        );

        $lang = $matches['lang'] ?? null;
        $ns = $matches['ns'] ?? null;
        $page = $matches['page'] ?? null;
        $subpath = $matches['path'] ?? null;

        // implicit so no redirect
        if (!$ns) $ns = Wiki::$defaultNamespace;

        // path: /wiki/Re:Zero ns = Re but invalid so it must be a page name
        if (!array_key_exists($ns, Wiki::$namespaces)) {
            $page = $ns . ':' . $page;
            $ns = Wiki::$defaultNamespace;
            if ($subpath) $page .= '/' . $subpath;
        }

        // explicit so we redirect
        // path: /wiki/
        if (!$lang && !$page) {
            return redirect()->route('wiki', Wiki::$defaultLang . '/' . Wiki::$mainPage);
        }

        // explicit so we redirect
        if (!$lang) {
            // todo@later: check if exists before redirecting?
            // todo@later: redirect to any lang that has it maybe? or maybe not since .wiki probz will use subdomains edit: nah let it 404 but offer options like disambigutation

            if (array_key_exists($page, Wiki::$languages)) {
                // path: /wiki/en lang = null but page is a valid lang
                return redirect()->route('wiki', $page . '/' . Wiki::$mainPage);
            } else {
                // path: /wiki/Page_Name lang = null and page = Page_Name
                return redirect()->route('wiki', Wiki::$defaultLang . '/' . $path);
            }
        }

        // todo@1: redirect Level: if empty subpath or have subpath optional?

        $title = $page;
        if ($subpath) $title .= '/' . $subpath;

        $article = WikiPage::query()
            ->where('lang', Wiki::$languages[$lang])
            ->where('namespace', Wiki::$namespaces[$ns])
            ->where('title', $title)
            ->with(['revision.text'])
            ->first();

        if ($request->string('action') == 'history') {
            $title .= ': Revision History';

            return page('Wiki/History', [
                'page' => $article,
                'title' => $title,
                'language' => $lang,
                'namespace' => $ns,
                'revisions' => $article?->revisions()
                    ->with(['author', 'size'])
                    ->latest()
                    ->paginate(25),
            ])->meta($title, 'View revision history of ' . $title)
                ->breadcrumbs([crumb('Wiki', route('wiki'))]);
        }

        return page('Wiki/Show', [
            'page' => $article,
            'title' => $title,
            'language' => $lang,
            'namespace' => $ns,
            'editing' => $request->string('action') == 'edit'
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
