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
            ->with(['files'])
            ->get();

        $macros->each(function (LevelReplay $macro) {
            if (count($macro->files) > 0) self::only($macro, $macro->files[0]);
        });
    }

    public static function only(LevelReplay $macro, Media|string $file, bool $save = true): ?float
    {
        $data = $file instanceof Media ? Storage::disk('contabo')->get($file->path) : $file;

        $fps = match ($macro->format->toString()) { // someone needs to die for this Illuminate Stringable shit
            'zbot_frame' => self::zbot($data),
            'mhr' => self::mhr($data),
            default => null,
        };
        if ($save) {
            $macro->fps = $fps;
            $macro->save();
        }
        return $fps;
    }

    public static function zbot(string $data): ?float
    {
        return (1.0 / unpack('gfps', hex2bin(substr(bin2hex($data), 0, 8)))['fps']);
    }

    public static function mhr(string $data): ?float
    {
        return unpack('Vfps', hex2bin(substr(bin2hex($data), 24, 8)))['fps'];
    }
}
