<?php

namespace App\Actions;

use App\Models\Content\Review;
use App\Models\Game\Level;
use App\Models\System\User;
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
        $threshold = 5;
        $chunk_select = 4000;
        $chunk_update = 1000;
        $columns = ['gameplay', 'visuals', 'overall'];

        // Reset all level averages
        Level::withoutTimestamps(function () {
            Level::query()->update([
                'rating_gameplay' => null,
                'rating_visuals' => null,
                'rating_overall' => null
            ]);
        });

        $levels = [];

        $counts = array_fill_keys($columns, []);
        $totals = array_fill_keys($columns, []);

        $users = User::query()
            ->select(['id', 'weight', 'banned_at'])
            ->whereHas('reviews')
            ->get()
            ->keyBy('id');

        Review::query()
            ->select(['id', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'weight', 'level_id', 'user_id'])
            ->chunk($chunk_select, function (Collection $reviews) use (&$users, &$counts, &$totals, &$levels, &$columns) {
                for ($i = 0, $count = $reviews->count(); $i < $count; $i++) {
                    $review = $reviews[$i];
                    $level_id = $review->level_id;
                    $levels[] = $level_id;

                    array_map(function ($column) use (&$counts, &$level_id) {
                        if (!array_key_exists($level_id, $counts[$column])) $counts[$column][$level_id] = 0;
                    }, $columns);

                    array_map(function ($column) use (&$totals, &$level_id) {
                        if (!array_key_exists($level_id, $totals[$column])) $totals[$column][$level_id] = 0;
                    }, $columns);

                    $weight = 0;

                    // Get review's user and set their weight based on column or if banned set to 0
                    if ($users->has($reviews[$i]->user_id)) {
                        $user = $users->get($reviews[$i]->user_id);
                        $weight = $user->banned_at === null ? $user->weight : 0;
                    }

                    // Review's weight trumps all weights
                    $weight = $review->weight ?? $weight;

                    // Tally up weighted scores
                    array_map(function ($column) use (&$counts, &$level_id, &$weight) {
                        $counts[$column][$level_id] += $weight;
                    }, $columns);

                    array_map(function ($column) use (&$totals, &$level_id, &$review, &$weight) {
                        $totals[$column][$level_id] += $review['rating_' . $column] * $weight;
                    }, $columns);
                }
            });

        // try to free from memory
        $users = null;

        $updates = [];

        // average out review tallies if the count is over threshold
        for ($i = 0, $count = count($levels); $i < $count; $i++) {
            $id = $levels[$i];

            $update = [
                'id' => $levels[$i],
                'rating_gameplay' => null,
                'rating_visuals' => null,
                'rating_overall' => null,
            ];

            array_map(function ($c) use (&$counts, &$totals, &$id, &$threshold, &$update) {
                // If review count passes threshold, then calculate the final average score
                if ($counts[$c][$id] >= $threshold) $update['rating_' . $c] = $totals[$c][$id] / $counts[$c][$id];
            }, $columns);

            $updates[] = $update;

            if ($i % $chunk_update === 0 || $i + 1 >= $count) {
                Level::withoutTimestamps(function () use (&$updates) {
                    Level::query()->upsert(
                        $updates,
                        'id',
                        ['rating_gameplay', 'rating_visuals', 'rating_overall']
                    );
                });

                $updates = [];
            }
        }
    }

    public static function level(Level $level): void
    {
        $reviews = Review::query()
            ->select(['id', 'rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'weight', 'level_id', 'user_id'])
            ->where('level_id', '=', $level->id)
            ->get()
            ->keyBy('id');

        $users = User::query()
            ->select(['id', 'weight', 'banned_at'])
            ->whereHas('reviews')
            ->get()
            ->keyBy('id');

        $level->update(self::filter($reviews, $users));
    }

    /**
     * @param Collection|null $reviews
     * @param Collection $users
     * @return array
     */
    private static function filter(?Collection $reviews, Collection $users): array
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

        if (!$reviews) return $scores;

        $reviews->map(function (Review $review) use (&$counts, &$scores, &$users) {
            $weight = 0;
            if ($users->has($review->user_id)) {
                $user = $users->get($review->user_id);
                $weight = $user->banned_at === null ? $user->weight : 0;
            }
            $weight = $review->weight ?? $weight;

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
