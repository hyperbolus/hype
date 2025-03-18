<?php

namespace App\Actions;

use App\Models\Content\Review;
use App\Models\Game\Level;
use Illuminate\Support\Collection;

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
        if ($reviews < 30) {
            return $lerp($avg, ($avg * $reviews + $confidence * $all_avg) / ($reviews + $confidence), 0.44);
        } else {
            return $avg;
        }
    }

    public static function all(): void
    {
        // Reset all level averages
        Level::query()->update([
            'rating_difficulty' => null,
            'rating_gameplay' => null,
            'rating_visuals' => null,
            'rating_overall' => null
        ]);

        $levels = Level::query()
            ->withCount('reviews')
            ->whereHas('reviews')
            ->get()
            ->where('reviews_count', '>', 5);

        $reviews = Review::all(['id', 'rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'level_id'])->keyBy('id');

        $updates = [];

        $levels->map(function (Level $level) use (&$updates, $reviews) {
            $updates[] = [
                'id' => $level->id,
                ...self::filter($reviews->filter(function (Review $review) use ($level) {
                    return $review->level_id === $level->id;
                }))
            ];
        });

        Level::query()->upsert(
            $updates,
            'id',
            ['rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall']
        );
    }

    public static function level(Level $level): void
    {
        $reviews = Review::query()
            ->select(['id', 'rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'level_id'])
            ->where('level_id', '=', $level->id)
            ->get()
            ->keyBy('id');

        $level->update(self::filter($reviews));
    }

    /**
     * @param Collection<Review> $reviews
     * @return array<Collection>
     */
    private static function filter(Collection $reviews): array
    {
        // Filter collections per rating to remove people who abstained
        $difficulty = $reviews->filter(fn (Review $review) => $review->rating_difficulty !== null);
        $gameplay = $reviews->filter(fn (Review $review) => $review->rating_gameplay !== null);
        $visuals = $reviews->filter(fn (Review $review) => $review->rating_visuals !== null);
        $overall = $reviews->filter(fn (Review $review) => $review->rating_overall !== null);

        return [
            'rating_difficulty' => self::score($difficulty->avg('rating_difficulty'), $difficulty->count(), true),
            'rating_gameplay' => self::score($gameplay->avg('rating_gameplay'), $gameplay->count()),
            'rating_visuals' => self::score($visuals->avg('rating_visuals'), $visuals->count()),
            'rating_overall' => self::score($overall->avg('rating_overall'), $overall->count()),
        ];
    }
}
