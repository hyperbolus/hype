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
//            'rating_difficulty',
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
    public static function curve(Builder|User|Level|null $source = null, string|array $columns = ['rating_overall', 'rating_visuals', 'rating_gameplay'/*, 'rating_difficulty'*/]): array
    {
        // Ensure $source is a query builder of Reviews
        if ($source instanceof Model) $source = $source->reviews();
        if ($source === null) $source = Review::query();

        $columns = Arr::wrap($columns);

        $curves = [];

        foreach ($columns as $column) {
            // one day we will get literal string type in php...
            $column = preg_replace('/[^a-z_]/i', '', $column);

            $isDifficulty = $column == 'rating_difficulty';

            // TODO@later: condense into one query
            $counts = $source->clone()->select([DB::raw('COUNT(*) as count'), $column])
                ->groupBy($column)
                ->get()
                ->keyBy($column)
                ->map(fn(Review $review) => $review->count);

            $curves[$column] = [];

            // zero and 10/100 inclusive
            for ($i = 0; $i <= ($isDifficulty ? 100 : 10); $i++) $curves[$column][$i] = $counts[$i] ?? 0;

            // condense 0-100 scale into 10 grouped strata plus 0
            if ($isDifficulty) {
                $condensed = array_fill(0, 11, 0);

                $condensed[0] = $curves[$column][0];

                // skip 0
                for ($i = 0; $i <= 100; $i++) $condensed[floor($i / 10)] += $curves[$column][$i] ?? 0;

                $curves[$column] = $condensed;
            }
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
            ->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'weight', 'flag', 'banned_at', 'premium_expires_at']);
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id')->withCount(['reviews']);
    }

    public function scopeWithReview(Builder $q) {
        $q->whereNotNull('review')->whereNot('review', '');
    }
}
