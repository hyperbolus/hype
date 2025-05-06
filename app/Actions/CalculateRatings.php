<?php

namespace App\Actions;

use App\Models\Content\Review;
use App\Models\Game\Level;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class CalculateRatings
{
    private static function score($avg, $reviews, $difficulty = false)
    {
        // Don't average if before x
        if ($reviews < 5) return null;

        $lerp = fn(float $a, float $b, float $t) => $a + $t * ($b - $a);

        $all_avg = $difficulty ? 10 : 5;
        $confidence = $difficulty ? 1 : 10;

        // Don't weight after x
        if ($reviews < 5) {
            return $lerp($avg, ($avg * $reviews + $confidence * $all_avg) / ($reviews + $confidence), 0.44);
        } else {
            return $avg;
        }
    }

    public static function rankings(bool $force = false)
    {
        $rankings = Cache::get('levels:rankings');

        if (!$rankings || $force) {
            $top100 = Level::query()
                ->select(['id', 'name', 'rating_overall'])
                ->withCount('reviews')
                ->orderBy('rating_overall', 'desc')
                ->orderBy('reviews_count', 'desc')
                ->limit(150) // TODO: might need an increase for ties over 100 barrier
                ->get();

            for ($i = 0; $i < $top100->count(); $i++) {
                if ($i > 0 && $top100[$i]['rating_overall'] === $top100[$i - 1]['rating_overall']) {
                    $rank = $top100[$i - 1]['rank'];
                } else {
                    $rank = $i + 1;
                }
                $top100[$i] = [
                    'id' => $top100[$i]->id,
                    'rating_overall' => $top100[$i]['rating_overall'],
                    'rank' => $rank,
                ];
            }

            Cache::put('levels:rankings', $top100, now()->addHour());
            $rankings = $top100;
        }

        return $rankings;
    }

    public static function rank(int $id, bool $force = false): array
    {
        $rankings = self::rankings($force);

        if ($rankings->where('id', $id)->count() > 0) {
            $rank = $rankings->where('id', $id)->first()['rank'];
            return [
                'rank' => $rankings->where('id', $id)->first()['rank'],
                'joint_ranked' => $rankings->where('rank', $rank)->count()
            ];
        }

        return [];
    }

    public static function all(): void
    {
        // Reset all level averages
        Level::withoutTimestamps(function () {
            Level::query()->update([
                'rating_difficulty' => null,
                'rating_gameplay' => null,
                'rating_visuals' => null,
                'rating_overall' => null
            ]);
        });

        $levels = Level::query()
            ->select('id')
            ->withCount('reviews')
            ->whereHas('reviews')
            ->get();

        $reviews = Review::query()
            ->select(['id', 'rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'level_id', 'user_id'])
            ->get()
            ->mapToGroups(fn (Review $review) => [$review->level_id => $review]);

        $updates = [];
        $empty = collect();

        $levels->map(function (Level $level) use (&$updates, &$reviews, &$empty) {
            if ($level->reviews_count >= 5) {
                $results = self::filter($reviews[$level->id] ?? $empty);
                $results['id'] = $level->id;
                $updates[] = $results;
            }
        });

        Level::withoutTimestamps(function () use (&$updates) {
            Level::query()->upsert(
                $updates,
                'id',
                ['rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall']
            );
        });
    }

    public static function level(Level $level): void
    {
        $reviews = Review::query()
            ->select(['id', 'rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'level_id', 'user_id'])
            ->where('level_id', '=', $level->id)
            ->get()
            ->keyBy('id');

        $level->update(self::filter($reviews));
    }

    /**
     * @param Collection $reviews
     * @return array
     */
    private static function filter(Collection $reviews): array
    {
        $counts = [
            'rating_difficulty' => 0,
            'rating_gameplay' => 0,
            'rating_visuals' => 0,
            'rating_overall' => 0,
        ];

        $scores = [
            'rating_difficulty' => 0,
            'rating_gameplay' => 0,
            'rating_visuals' => 0,
            'rating_overall' => 0,
        ];

        $reviews->map(function (Review $review) use (&$counts, &$scores) {
            $deweighted = in_array($review->user_id, [5977, 5799, 6570]);
            $weight = $deweighted ? 0 : 1;

            if ($review->rating_difficulty !== null) {
                $counts['rating_difficulty'] += $weight;
                $scores['rating_difficulty'] += $review->rating_difficulty * $weight;
            }
            if ($review->rating_gameplay !== null) {
                $counts['rating_gameplay'] += $weight;
                $scores['rating_gameplay'] += $review->rating_gameplay * $weight;
            }
            if ($review->rating_visuals !== null) {
                $counts['rating_visuals'] += $weight;
                $scores['rating_visuals'] += $review->rating_visuals * $weight;
            }
            if ($review->rating_overall !== null) {
                $counts['rating_overall'] += $weight;
                $scores['rating_overall'] += $review->rating_overall * $weight;
            }
        });

        return [
            'rating_difficulty' => $counts['rating_difficulty'] < 5 ? null : $scores['rating_difficulty'] / $counts['rating_difficulty'],
            'rating_gameplay' => $counts['rating_gameplay'] < 5 ? null : $scores['rating_gameplay'] / $counts['rating_gameplay'],
            'rating_visuals' => $counts['rating_visuals'] < 5 ? null : $scores['rating_visuals'] / $counts['rating_visuals'],
            'rating_overall' => $counts['rating_overall'] < 5 ? null : $scores['rating_overall'] / $counts['rating_overall'],
        ];

        // for weighting:

//        return [
//            'rating_difficulty' => self::score($difficulty->avg('rating_difficulty'), $difficulty->count(), true),
//            'rating_gameplay' => self::score($gameplay->avg('rating_gameplay'), $gameplay->count()),
//            'rating_visuals' => self::score($visuals->avg('rating_visuals'), $visuals->count()),
//            'rating_overall' => self::score($overall->avg('rating_overall'), $overall->count()),
//        ];
    }
}
