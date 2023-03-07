<?php

namespace App\Mixins;

use Illuminate\Database\Schema\Blueprint;

/**
 * @mixin Blueprint
 */
class BlueprintMixin
{
    public function intMorphs(string $name, string $indexName = null): void
    {
        $this->foreignId($name . '_id');
        $this->unsignedSmallInteger($name . '_type');
        $this->index([$name . '_id', $name . '_type'], $indexName);
    }

    public function nullableIntMorphs(string $name, string $indexName = null): void
    {
        $this->foreignId($name . '_id')->nullable();
        $this->unsignedSmallInteger($name . '_type')->nullable();
        $this->index([$name . '_id', $name . '_type'], $indexName);
    }

    public function approved(): void
    {
        $this->timestamp('approved_at')->nullable();
        $this->foreignId('approved_by_id')->nullable();
    }
}
