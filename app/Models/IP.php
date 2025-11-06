<?php

namespace App\Models;

use App\FilterBuilder;
use App\Models\System\User;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperIP
 */
class IP extends Model
{
    use Sortable;

    protected $table = 'ips';

    protected $casts = [
        'last_seen_at' => 'datetime',
    ];

    public function getSortableAttributes(): array
    {
        return [
            'id',
            'address' => function(FilterBuilder $q) {
                $q->orderByRaw('LOWER(name) ' . $q->getSortDir());
            },
            'last_seen_at',
            'created_at',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
}
