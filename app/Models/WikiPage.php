<?php

namespace App\Models;

use App\Wiki;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class WikiPage extends Model
{
    public function getURL(): string
    {
        return route('wiki', $this->getURIPath());
    }

    public function getURIPath(): string
    {
        $lang = array_search($this->lang, Wiki::$languages);
        $ns = array_search($this->namespace, Wiki::$namespaces);

        $path = $lang . '/';
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
