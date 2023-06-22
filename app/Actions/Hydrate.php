<?php

namespace App\Actions;

use App\Models\Game\Level;
use Illuminate\Support\Facades\Http;

class Hydrate
{
    public static function level(int $id, bool $abort = true): ?Level
    {
        $level = Level::query()->find($id);

        // TODO: Find some heuristic for updating levels, maybe more frequently if in mod queue
        if ($level === null) {
            $res = Http::get('https://gdbrowser.com/api/level/'.$id)->json();

            if ($res == -1) {
                if ($abort) {
                    abort(400, 'Invalid Level ID');
                }

                return null;
            }

            $level = new Level();
            $level->id = $id;
            $level->name = $res['name'];
            $level->creator = $res['author'];
            $level->description = $res['description'];

            $difficulties = [
                'unrated' => 0,
                'auto' => 1,
                'easy' => 2,
                'normal' => 3,
                'hard' => 4,
                'harder' => 5,
                'insane' => 6,
                'easy demon' => 7,
                'medium demon' => 8,
                'hard demon' => 9,
                'insane demon' => 10,
                'extreme demon' => 11,
            ];

            $lengths = [
                'tiny' => 0,
                'short' => 1,
                'medium' => 2,
                'long' => 3,
                'xl' => 4,
            ];

            $level->difficulty = $difficulties[strtolower($res['difficulty'])];
            $level->featured = $res['featured'];
            $level->epic = $res['epic'];
            $level->coins_verified = $res['verifiedCoins'];
            $level->coins = $res['coins'];
            $level->stars = $res['stars'];
            if ($res['officialSong'] === 0) {
                $level->song_id = $res['songID'];
                $level->song_url = $res['songLink'];
            }
            $level->song_name = $res['songName'];
            $level->song_author = $res['songAuthor'];
            $level->objects = $res['objects'];
            $level->downloads = $res['downloads'];
            $level->likes = $res['likes'];
            $level->length = $lengths[strtolower($res['length'])];

            $level->save();
        }

        return $level;
    }
}
