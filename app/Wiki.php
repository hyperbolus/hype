<?php

namespace App;

use App\Models\ModelRevision;
use App\Models\RevisionText;
use App\Models\System\User;
use App\Models\WikiPage;
use Illuminate\Support\Str;

class Wiki
{
    public static array $namespaces = [
        // Functional
        'Special' => -1,
        'Revision' => null,

        // Standard
        'Article' => 0,

        // Meta
        'Wiki' => 1,
        'Hype' => 2, // replaces itself with the website name

        // Dictionary
        'Term' => 10,

        // Guide
        'Book' => 11,

        // DB Backed, title is foreign key. allows any subpath
        'Level' => 20,
        'Profile' => 21,
        'Tag' => 22,
    ];

    public static string $defaultNamespace = 'Article';

    public static array $languages = [
        'en' => 0,
        'es' => 1,
        'ru' => 2,
        'ko' => 3,
    ];

    public static string $defaultLang = 'en';

    public static string $mainPage = 'Home';

    public static function makePage(
        string     $title,
        string|int $namespace,
        string|int $lang,
        User|int   $author,
        string     $description,
        string     $content
    ): WikiPage
    {
        if (is_string($namespace)) $namespace = Wiki::$namespaces[$namespace];
        if (is_string($lang)) $lang = Wiki::$namespaces[$namespace];

        // Create stub page first
        // TODO@later: logic for linking root and parent pages etc
        $page = new WikiPage();
        $page->title = $title;
        $page->namespace = $namespace;
        $page->lang = $lang;
        $page->save();

        self::makeRevision($page, $author, $content, $description);

        // TODO: make sure revision relationship is sent over too
        return $page;
    }

    public static function makeRevision(
        WikiPage $page,
        User|int $author,
        string   $content,
        string   $description
    ): ModelRevision
    {
        if ($author instanceof User) $author = $author->id;

        // Create initial revision
        $revision = new ModelRevision();
        $revision->author_id = $author;
        $revision->model_type = 70;
        $revision->model_id = $page->id;
        $revision->description = $description;
        $revision->save();

        // Store the page content
        $text = new RevisionText();
        $text->revision_id = $revision->id;
        $text->content = $content;
        $text->new_length = Str::length($content);
        $text->old_length = 0;
        $text->save();

        // Assign our new initial revision to the page
        $page->length = Str::length($content);
        $page->revision_id = $revision->id;
        $page->save();

        return $revision;
    }

    /**
     * Parses a wiki path.
     * '/wiki/' prefix is used for clarity but only the stuff after it should ever get sent to $path
     *
     * @param string $path
     * @return array
     */
    public static function parsePath(string $path): array
    {
        $redirect = null;

        $matches = [];

        // The Monstrosity
        // path: /wiki/en/Book:Editor_Guide/Triggers
        // lang = en, ns = Book, page = Editor_Guide, subpath = Triggers
        // `page` and `subpath` are stored as a single `title` separated by a slash
        // /wiki/Book:Editor_Guide/Triggers
        // in db: title = Editor_Guide/Triggers
        // However some namespaces like `Level` use a default dummy subpath for SEO
        // /wiki/Level:12345/Cataclysm
        // in db: title = 12345
        // So in this case we want to be able to parse it separate
        // TODO@later: Maybe it would have been better to just string split afterwards...
        preg_match(
            '/(?:(?<lang>[a-zA-Z0-9_]*?)\/)?(?:(?<ns>[a-zA-Z0-9_]*):)?(?<page>[a-zA-Z0-9_]*)(?:\/(?<subpath>.*))?/',
            $path,
            $matches
        );

        $lang = $matches['lang'] ?? null;
        $ns = $matches['ns'] ?? null;
        $page = $matches['page'] ?? null;
        $subpath = $matches['subpath'] ?? null;

        // path: /wiki/Main_Page
        // The default namespace is allowed to be implicit
        // So if there is no namespace we assume the default
        // We do not redirect, just silently set variable
        if (!$ns) $ns = Wiki::$defaultNamespace;

        // path: /wiki/Re:Zero or /wiki/en/Re:Zero
        // expected: lang = null, ns = null, page = Re:Zero
        // actual: lang = null, ns = Re, page = Zero
        // ns isn't in Wiki::$namespaces, assume it's a page name
        if (!array_key_exists($ns, Wiki::$namespaces)) {
            $page = $ns . ':' . $page;
            $ns = Wiki::$defaultNamespace;
        }

        // path: /wiki/Main_Page/sub
        // expected: lang = null, page = Main_Page, subpath = sub
        // actual: lang = Main_Page, page = sub, subpath = null
        // lang isn't in Wiki::$languages, assume it's a page name
        // doesn't occur when namespace because ':' helps it parse correctly
        if ($lang && !array_key_exists($lang, Wiki::$languages)) {
            $subpath = $page;
            $page = $lang;

            // missing lang gets handled later
            $lang = null;
        }

        // path: /wiki/
        // If visiting the base wiki url, do a fully explicit redirect with the defaults
        // (ns(?) and subpath are already originally implicitly null in this scenario)
        if (!$lang && !$page) $redirect = Wiki::$defaultLang . '/' . Wiki::$mainPage;

        // The language must be explicitly in the URL. Otherwise, we must redirect
        if (!$lang) {
            // we always redirect to default language if none is included without checking if it exists
            // but if that is missing, maybe that request will 404 but offer pages matching title in other languages like disambiguation

            if ($ns === Wiki::$defaultNamespace && array_key_exists($page, Wiki::$languages)) {
                // path: /wiki/en
                // page = en and lang = null
                // `page` contains a valid language
                $lang = $page;
                $page = Wiki::$mainPage;
            } else {
                // path is just the page title, possibly with a namespace
                // path: /wiki/Page_Name lang = null and page = Page_Name
                $lang = Wiki::$defaultLang;
            }

            // Build redirect path
            $redirect = $lang . '/';
            if ($ns !== Wiki::$defaultNamespace) $redirect .= $ns . ':';
            $redirect .= $page;
            if ($subpath) $redirect .= '/' . $subpath;
        }

        // todo@1: redirect Level: canonical uri is SEO friendly but only ID is required 12345/Cataclysm

        $title = $page;
        if ($subpath) $title .= '/' . $subpath;

        return [
            'lang' => $lang,
            'namespace' => $ns,
            'title' => $title,
            'redirect' => $redirect,
        ];
    }
}
