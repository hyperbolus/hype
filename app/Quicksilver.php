<?php

namespace App;

use App\Libraries\Quicksilver\Tags\TagInvoke;
use App\Libraries\Quicksilver\Tags\TagInvokeInert;
use App\Libraries\Quicksilver\Tags\TagTemplate;
use App\Models\ModelRevision;
use Dom\HTMLDocument;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Liquid\Context;
use Liquid\FileSystem\Virtual;
use Liquid\Template;

class Quicksilver {
    public Template $engine;
    public bool $allowModules = false;

    public function __construct(public string $source, bool $modules = false)
    {
        $this->allowModules = $modules;

        $this->engine = new Template();

        try {
            // Liquid's 'FileSystem' classes can get serialized when used with caching (which we don't)
            // and php 'Closure' (anonymous functions) don't serialize, so we use an array class callable
            $this->engine->setFileSystem(new Virtual([self::class, 'virtualInclude']));
        } catch (Exception $e) {
            // Should never occur. If it ever does then something is probably seriously fucked up yo
            Log::error($e->getMessage());
        }
    }

    public function render(array $data = [], bool $trim = false): string
    {
        // Using invoke tags when modules are disabled will simply return an empty string
        $this->engine->registerTag('invoke', $this->allowModules ? TagInvoke::class : TagInvokeInert::class);
        // Template tags will include wiki templates
        // TODO@Quicksilver: cache db queries or attempt batching
        // TODO@Quicksilver: recursion checking
        $this->engine->registerTag('template', TagTemplate::class);

        $this->engine->parse($this->source);
        $output = $this->engine->render($data);

        return $trim ? Str::trim($output) : $output;
    }

    /**
     * Uses a heuristic to guess what templates will be required so they can be fetched in a single database query
     *
     * We render the template with placeholders which we will replace post-render, not during
     *
     * @return void
     */
    public function eagerLoad()
    {

    }

    public static function virtualInclude(): string
    {
        return '';
    }

    public static function parseParameterString(string $string, ?Context $context = null): array
    {
        $chars = mb_str_split(Str::trim($string));

        $fragments = [];

        $fragment = '';
        $inQuote = false;
        $escaping = false;

        // Split parameter string into array of fragments
        for ($i = 0; $i < count($chars); $i++) {
            $c = $chars[$i];

            if ($c === '\\') {
                if ($escaping) {
                    $fragment .= $c;
                    $escaping = false;
                } else {
                    $escaping = true;
                }
            } else if ($c === '"') {
                if ($escaping) {
                    $fragment .= $c;
                    $escaping = false;
                } else {
                    $inQuote = !$inQuote;
                    $fragment .= $c;
                }
            } else if ($c === ',') {
                $fragments[] = $fragment;
                $fragment = '';
            } else {
                $fragment .= $c;
            }

            // Make sure to push the last fragment
            if ($i >= count($chars) - 1) {
                $fragments[] = $fragment;
                $fragment = '';
            }
        }

        $parameters = [];

        // parse each parameter
        for ($i = 0; $i < count($fragments); $i++) {
            preg_match_all('/^(?:(.*):)?\s*(.*)$/', Str::trim($fragments[$i]), $matches);

            // Split named parameters into their key and value parts
            // Ordered parameters will have a null key not a numbered key
            // Named parameters must come after ALL ordered parameters
            $key = $matches[1][0] ?? null;
            $value = $matches[2][0] ?? null;

            // trim
            if (is_string($key)) $key = Str::trim($key);
            if (is_string($value)) $value = Str::trim($value);

            if (Str::isMatch('/^".*"$/', $value)) {
                // is string literal
                $value = Str::substr($value, 1, Str::length($value) - 2);
            } else if (Str::isMatch('/^\d+$/', $value)) {
                // is integer
                $value = intval($value);
            } else if (Str::isMatch('/^\d*\.\d+|\d+\.\d*$/', $value)) {
                // is decimal
                $value = floatval($value);
            } else if (Str::isMatch('/^.*$/', $value)) {
                // is valid identifier
                $value = $context?->get($value);
            } else {
                // invalid
            }

            if ($key) {
                $parameters[$key] = $value;
            } else {
                $parameters[] = $value;
            }
        }

        return $parameters;
    }

    public static function prepareWikiContent(ModelRevision $revision, string $namespace): ModelRevision
    {
        // Module pages do not get processed
        // TODO@Luna but maybe module documentation pages should...
        if ($namespace === 'Module') return $revision;

        $content = $revision?->text->content ?? '';

        $dom = HTMLDocument::createFromString($content, LIBXML_NOERROR);

        // TODO@Quicksilver should page get to decide to trim or not?

        foreach ($dom->querySelectorAll('liquid') as $el) {
            $el->innerHTML = new Quicksilver($el->innerHTML, modules: true)->render(trim: true);
        }

        foreach ($dom->querySelectorAll('include') as $el) {
            $title = $el->attributes->getNamedItem('template')?->value ?? '';
            $args = $el->attributes->getNamedItem('args')?->value ?? '';

            $page = Wiki::getPage($title, Wiki::$defaultLang, Wiki::$templateNamespace);
            $content = $page?->revision?->text?->content ?? '';

            $el->innerHTML = $content === '' ? $el->innerHTML : new Quicksilver($content, modules: true)->render(
                Quicksilver::parseParameterString($args),
                true,
            );
        }

        foreach ($dom->querySelectorAll('invoke') as $el) {
            $module = $el->attributes->getNamedItem('module')?->value ?? '';
            $subscript = $el->attributes->getNamedItem('subscript')?->value ?? '';
            $args = $el->attributes->getNamedItem('args')?->value ?? '';

            // Should we trim module outputs?
            $el->innerHTML = Luna::module($module, $subscript, Quicksilver::parseParameterString($args));
        }

        $revision->setAttribute('blurb', $dom->querySelector('p')?->innerHTML);
        $revision->text->setAttribute('content', $dom->body->innerHTML);

        return $revision;
    }
}
