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
        $url = array_search($this->lang, Wiki::$languages) . '/';
        if ($this->namespace) $url .= array_search($this->namespace, Wiki::$namespaces) . ':';
        return $url . $this->title;
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
