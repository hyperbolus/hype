<?php

namespace App\Actions;

use App\Models\Game\Level;

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
        $levels = Level::all();
        $levels->each(function (Level $level) {
            self::level($level);
        });
    }

    public static function level(Level $level): void {
        $level->rating_difficulty = self::avgRating('difficulty', $level);
        $level->rating_gameplay = self::avgRating('gameplay', $level);
        $level->rating_visuals = self::avgRating('visuals', $level);
        $level->rating_overall = self::avgRating('overall', $level);
        $level->save();
    }

    private static function avgRating(string $type, Level $level): float {
        if (!in_array($type, self::$validTypes)) return 0.0;

        return (float)\App\Models\Content\Review::query()
            ->where('level_id', '=', $level->id)
            ->whereNotNull('rating_' . $type)
            ->avg('rating_' . $type);
    }
}
