<?php

namespace App\Models;

use App\Models\System\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ModelRevision extends Model
{
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function model(): BelongsTo
    {
        return $this->morphTo();
    }

    public function text(): HasOne
    {
        return $this->hasOne(RevisionText::class, 'revision_id')->whereNull('key');
    }

    public function size(): HasOne
    {
        return $this->hasOne(RevisionText::class, 'revision_id')->select(['id', 'revision_id', 'old_length', 'new_length'])->whereNull('key');
    }

    public function texts(): HasMany
    {
        return $this->hasMany(RevisionText::class, 'revision_id');
    }
}
