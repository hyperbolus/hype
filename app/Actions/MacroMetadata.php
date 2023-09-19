<?php

namespace App\Actions;

use App\Models\Game\LevelReplay;
use App\Models\Media;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class MacroMetadata
{
    public static function all(): void
    {
        $macros = LevelReplay::query()
            ->whereNull('fps')
            ->where('format', '=', 'zbot_frame')
            ->with(['files'])
            ->get();

        $macros->each(function (LevelReplay $macro) {
            $macro->fps = self::zbot($macro->files);
            $macro->save();
        });
    }

    public static function only(LevelReplay $macro): void
    {
        if (!$macro->relationLoaded('files')) {
            $macro->load(['files']);
        }
        $macro->fps = self::zbot($macro->files);
        $macro->save();
    }

    private static function zbot(array|Collection $files): ?float
    {
        if (count($files) === 0) return null;
        /**
         * @type Media $file
         */
        $file = $files[0];

        $data = Storage::disk('contabo')->get($file->path);

        return (1.0 / unpack('gfps', hex2bin(substr(bin2hex($data), 0, 8)))['fps']);
    }
}
