<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Wiki\Special\SpecialPageController;
use App\Hype;
use App\Models\ModelRevision;
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
        $data = $request->validate([
            'title' => ['required', 'string'],
            'language' => ['required', 'string', Rule::in(array_keys(Wiki::$languages))],
            'namespace' => ['required', 'string', Rule::in(array_keys(Wiki::$namespaces))],

            'content' => ['required', 'string'],

            'description' => ['required', 'string'],
        ]);

        return redirect(Wiki::makePage(
            $data['title'],
            $data['namespace'],
            $data['language'],
            $request->user(),
            $data['description'],
            $data['content']
        )->getURL());
    }

    public function show(Request $request, string $path = '')
    {
        $routePrefix = '';

        // If we are on the dedicated wiki domain, the language won't be in the URL path
        if (Hype::isSubsite()) {
            // TODO@wiki: set language based on subdomain
            $path = 'en/' . $path;
            $routePrefix = 'wiki$';
        }

        $revision = null;
        $revisions = null;
        $page = null;
        $action = $request->string('action', 'read')->toString();

        [
            'lang' => $lang,
            'namespace' => $namespace,
            'title' => $title,
            'redirect' => $redirect,
        ] = Wiki::parsePath($path);

        if ($redirect) return redirect()->route($routePrefix . 'wiki', $redirect);

        // Special pages aren't fetched from the database, they have their own controllers
        if ($namespace === 'Special') {
            // Make sure it's a valid special page, they are explicitly defined
            abort_if(!array_key_exists($title, Wiki::$specialPages), 404);

            // Dispatch to special page controller
            return (new SpecialPageController)->{Wiki::$specialPages[$title]}($request);
        } else {
            $page = WikiPage::query()
                ->where('lang', Wiki::$languages[$lang])
                ->where('namespace', Wiki::$namespaces[$namespace])
                ->where('title', $title)
                ->first();

            if ($page) {
                if ($action === 'history') {
                    // Get the revision history
                    $revisions = $page?->revisions()
                        ->with(['author', 'size'])
                        ->latest()
                        ->paginate(25);
                } else {
                    // If viewing or editing grab the latest revision.
                    // If specified, grab an old revision
                    $q = !$request->has('revision') ? $page->revision() : ModelRevision::query()
                        ->where('model_type', 70)
                        ->where('model_id', $page->id)
                        ->where('id', $request->integer('revision'));

                    $revision = Wiki::prepareContent($q->with(['author', 'text'])->firstOrFail());
                }
            }
        }

        return page('Wiki/Show', [
            'page' => $page,
            'revision' => $revision,

            'revisions' => $revisions,

            'path' => $path,
            'title' => $title,
            'language' => $lang,
            'namespace' => $namespace,

            'action' => $action,
        ])->meta($title, 'CHANGE ME')
            ->breadcrumbs([crumb('Wiki', route($routePrefix . 'wiki'), !Hype::isSubsite())]);
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
        $data = $request->validate([
            'content' => ['required', 'string'],
            'description' => ['required', 'string'],
        ]);

        Wiki::makeRevision($page, $request->user(), $data['content'], $data['description']);

        return redirect($page->getURL());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WikiPage $wikiPage)
    {
        //
    }
}
