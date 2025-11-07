<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RevisionText extends Model
{
    protected $table = 'revision_text';

    public function revision(): BelongsTo
    {
        return $this->belongsTo(ModelRevision::class, 'revision_id');
    }
}
