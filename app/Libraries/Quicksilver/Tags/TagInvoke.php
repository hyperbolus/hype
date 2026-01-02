<?php

namespace App\Libraries\Quicksilver\Tags;

use App\Quicksilver;
use Illuminate\Support\Str;
use Liquid\AbstractTag;
use Liquid\Context;
use App\Luna;

class TagInvoke extends AbstractTag
{
    public function render(Context $context): string
    {
        preg_match_all('/"(\S*)"\s*(?:"(\S*)"\s+)?(?:\((.*)\))?/', Str::trim($this->markup), $matches);

        $parameters = Quicksilver::parseParameterString($matches[3][0] ?? '', $context);

        return Luna::module($matches[1][0] ?? '', $matches[2][0] ?? '', $parameters);
    }
}
