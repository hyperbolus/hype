<?php

namespace App\Mixins;

use Illuminate\Database\Schema\Blueprint;

/**
 * @mixin Blueprint
 */
class BlueprintMixin {
    public function intMorphs(string $name): void {
        $this->foreignId($name . '_id');
        $this->unsignedSmallInteger($name . '_type');
        $this->index([$name . '_id', $name . '_type']);
    }

    public function nullableIntMorphs(string $name): void {
        $this->foreignId($name . '_id')->nullable();
        $this->unsignedSmallInteger($name . '_type')->nullable();
        $this->index([$name . '_id', $name . '_type']);
    }
}
