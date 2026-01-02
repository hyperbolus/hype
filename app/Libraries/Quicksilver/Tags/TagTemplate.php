<?php

namespace App\Libraries\Quicksilver\Tags;

use App\Models\WikiPage;
use App\Quicksilver;
use App\Wiki;
use Liquid\AbstractTag;
use Liquid\Context;
use Liquid\Document;
use Liquid\FileSystem;
use Liquid\LiquidException;
use Liquid\Template;
use Str;

class TagTemplate extends AbstractTag
{

    private ?Document $document = null;

    private string $parameterString;
    private string $templateName;

    public function __construct(string $markup, array &$tokens, ?FileSystem $fileSystem = null)
    {
        preg_match_all('/^"(.*?)"\s+(?:\((.*)\))?$/', Str::trim($markup), $matches);

        $this->templateName = $matches[1][0] ?? '';
        $this->parameterString = $matches[2][0] ?? '';

        parent::__construct($markup, $tokens, $fileSystem);
    }

    public function parse(array &$tokens): void
    {
        // Warn missing page
        $page = Wiki::getPage($this->templateName, Wiki::$defaultLang, Wiki::$templateNamespace);
        if (!$page) return;

        $templateTokens = Template::tokenize($page?->revision?->text?->content ?? '');
        $this->document = new Document($templateTokens, $this->fileSystem);
    }

    /**
     * @throws LiquidException
     */
    public function render(Context $context): string
    {
        if (!$this->document) return 'Could not find template "' . $this->templateName . '"';

        // Parse parameters into dictionary, also resolves variables to pass into template
        $parameters = Quicksilver::parseParameterString($this->parameterString, $context);

        $context->push();

        // Assign user defined arguments
        foreach ($parameters as $key => $value) $context->set($key, $value);

        $output = $this->document->render($context);

        $context->pop();

        return $output;
    }
}
