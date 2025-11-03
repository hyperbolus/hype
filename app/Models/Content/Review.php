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
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
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

    /**
     * @param Builder|User|Level|null $source
     * @param literal-string|literal-string[] $columns
     * @return array
     */
    public static function curve(Builder|User|Level|null $source = null, string|array $columns = ['rating_overall', 'rating_visuals', 'rating_gameplay', 'rating_difficulty']): array
    {
        // Ensure $source is a query builder of Reviews
        if ($source instanceof Model) $source = $source->reviews();
        if ($source === null) $source = Review::query();

        $columns = Arr::wrap($columns);

        $curves = [];

        foreach ($columns as $column) {
            // one day we will get literal string type in php...
            $column = preg_replace('/[^a-z_]/i', '', $column);

            // TODO@later: condense into one query
            $counts = $source->clone()->select([DB::raw('COUNT(*) as count'), $column])
                ->groupBy($column)
                ->get()
                ->keyBy($column)
                ->map(fn(Review $review) => $review->count);

            $curves[$column] = [
                0 => $counts[0] ?? 0,
                1 => $counts[1] ?? 0,
                2 => $counts[2] ?? 0,
                3 => $counts[3] ?? 0,
                4 => $counts[4] ?? 0,
                5 => $counts[5] ?? 0,
                6 => $counts[6] ?? 0,
                7 => $counts[7] ?? 0,
                8 => $counts[8] ?? 0,
                9 => $counts[9] ?? 0,
                10 => $counts[10] ?? 0,
            ];
        }

        return $curves;
    }

    public function toSearchableArray(): array
    {
        return $this->toArray();
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')
            ->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'weight', 'flag', 'banned_at']);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id')->withCount(['reviews']);
    }

    public function scopeWithReview(Builder $q) {
        $q->whereNotNull('review')->whereNot('review', '');
    }
}
