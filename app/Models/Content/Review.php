<?php

namespace App\Models\Content;

use App\FilterBuilder;
use App\Models\Game\Level;
use App\Models\System\User;
use App\Traits\Sortable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

/**
 * @mixin IdeHelperReview
 */
class Review extends Model
{
    use HasFactory;
    use Searchable;
    use Sortable;

    protected $fillable = [
        'rating_gameplay',
        'rating_visuals',
        'rating_difficulty',
        'rating_overall',
        'review',
        'level_id',
        'user_id',
    ];

    public function getSortableAttributes(): array
    {
        return [
            'rating_gameplay',
            'rating_visuals',
            'rating_difficulty',
            'rating_overall',
            'created_at'
        ];
    }

    public function getSortableFilters(): array
    {
        return [
            'ratings_only' => function (FilterBuilder $q) {
                $q->whereIn('review', [null, '']);
            },
            'reviews_only' => function (FilterBuilder $q) {
                $q->whereNotNull('review')->whereNot('review', '');
            },
        ];
    }

    public function toSearchableArray(): array
    {
        return $this->toArray();
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')
            ->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'weight', 'flag']);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id')->withCount(['reviews']);
    }

    public function scopeWithReview(Builder $q) {
        $q->whereNotNull('review')->whereNot('review', '');
    }
}
