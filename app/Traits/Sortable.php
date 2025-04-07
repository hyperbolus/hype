<?php

namespace App\Traits;

trait Sortable
{
    public function getSortableAttributes(): array
    {
        return ['created_at'];
    }

    public function getSortableFilters(): array
    {
        return [];
    }
}
