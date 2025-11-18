<?php

namespace App\Models;

use App\Hype;
use App\Wiki;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class WikiPage extends Model
{
    public function getURL(): string
    {
        return route((Hype::isSubsite() ? Hype::getSubsite() . '$' : '') . 'wiki', $this->getURIPath());
    }

    public function getURIPath(): string
    {
        $lang = array_search($this->lang, Wiki::$languages);
        $ns = array_search($this->namespace, Wiki::$namespaces);

        $path = '';
        if (!Hype::isSubsite()) $path = $lang . '/';
        if ($ns !== Wiki::$defaultNamespace) $path .= $ns . ':';

        return $path . $this->title;
    }

    public function revisions(): MorphMany
    {
        return $this->morphMany(ModelRevision::class, 'model');
    }

    public function revision(): BelongsTo
    {
        return $this->belongsTo(ModelRevision::class, 'revision_id');
    }
}
