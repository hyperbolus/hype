<?php

namespace App\Libraries\Quicksilver\Tags;

use Liquid\AbstractTag;
use Liquid\Context;

class TagInvokeInert extends AbstractTag
{
    public function render(Context $context): string
    {
        return '';
    }
}
