<?php

namespace App\Actions;

use App\Models\Content\Review;
use App\Models\Game\Level;
use Illuminate\Database\Eloquent\Collection;
use function Clue\StreamFilter\fun;

class CalculateRatings
{
    protected static $validTypes = [
        'difficulty',
        'gameplay',
        'visuals',
        'overall',
    ];

    public static function all(): void
    {
        Level::query()->update([
            'rating_difficulty' => null,
            'rating_gameplay' => null,
            'rating_visuals' => null,
            'rating_overall' => null,
        ]);

        $levels = Level::query()
            ->withCount('reviews')
            ->whereHas('reviews')
            ->get()
            ->where('reviews_count', '>', 5);

        $reviews = Review::all(['id', 'rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall', 'level_id'])->keyBy('id');

        $updates = [];

        $levels->map(function (Level $level) use (&$updates, $reviews) {
            $ratings = $reviews->filter(function (Review $review) use ($level) {
                return $review->level_id === $level->id;
            });

            clock($ratings);

            $updates[] = clock([
                'id' => $level->id,
                'rating_difficulty' => $ratings->avg('rating_difficulty'),
                'rating_gameplay' => $ratings->avg('rating_gameplay'),
                'rating_visuals' => $ratings->avg('rating_visuals'),
                'rating_overall' => $ratings->avg('rating_overall'),
            ]);
        });

        Level::query()->upsert(
            $updates,
            ['id'],
            ['rating_difficulty', 'rating_gameplay', 'rating_visuals', 'rating_overall']
        );
    }

    public static function level(Level $level): void
    {
        if ($level->reviews_count < 5) {
            $level->rating_difficulty = null;
            $level->rating_gameplay = null;
            $level->rating_visuals = null;
            $level->rating_overall = null;
        } else {
            $level->rating_difficulty = self::avgRating('difficulty', $level);
            $level->rating_gameplay = self::avgRating('gameplay', $level);
            $level->rating_visuals = self::avgRating('visuals', $level);
            $level->rating_overall = self::avgRating('overall', $level);
        }
        $level->save();
    }

    private static function avgRating(string $type, Level $level): float
    {
        if (!in_array($type, self::$validTypes)) return 0.0;

        return (float)\App\Models\Content\Review::query()
            ->where('level_id', '=', $level->id)
            ->whereNotNull('rating_' . $type)
            ->avg('rating_' . $type);
    }
}
