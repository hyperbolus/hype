<?php

namespace App\Actions;

use App\Models\Game\Level;
use App\Models\Game\Profile;
use Illuminate\Support\Facades\Http;

class Hydrate
{
    public static function level(int $id, bool $abort = true): ?Level
    {
        $level = Level::query()->find($id);

        // TODO: Find some heuristic for updating levels, maybe more frequently if in mod queue
        if (!$level || !$level->last_fetched_at || $level->last_fetched_at->timestamp < now()->subWeek()->timestamp) {
            if ($level && $level->id <= 20) return $level;

            $res = Http::get('https://gdbrowser.com/api/level/'.$id)->json();

            if ($res == -1) {
                if ($level) return $level;

                if ($abort) abort(400, 'Invalid Level ID');
                return null;
            }

            if (!$level) $level = new Level();
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
                'plat' => -1,
                'tiny' => 0,
                'short' => 1,
                'medium' => 2,
                'long' => 3,
                'xl' => 4,
            ];

            $level->difficulty = $difficulties[strtolower($res['difficulty'])];
            $level->featured = $res['featured'];
            $level->epic = $res['epicValue'];
            $level->coins_verified = $res['verifiedCoins'];
            $level->coins = $res['coins'];
            $level->stars = $res['stars'];
            if ($res['officialSong'] === 0) {
                $level->song_id = $res['songID'];
                $level->song_url = $res['songLink'] ?? null;
            }
            $level->song_name = $res['songName'];
            $level->song_author = $res['songAuthor'];
            $level->objects = $res['objects'];
            $level->downloads = $res['downloads'];
            $level->likes = $res['likes'];
            $level->length = $lengths[strtolower($res['length'])];
            $level->last_fetched_at = now();
            $level->save();

            // Get defaults from database
            $level = Level::find($level->id);
        }

        return $level;
    }

    public static function profile(string $name, bool $abort = true): ?Profile {
        $profile = Profile::query()->where('username', '=', $name)->first();

        if ($profile === null) {
            $res = Http::get('https://gdbrowser.com/api/profile/' . $name)->json();

            if ($res == -1) {
                if ($abort) {
                    abort(400, 'Invalid User');
                }

                return null;
            }

            $profile = new Profile();
            $profile->account_id = $res['accountID'];
            $profile->player_id = $res['playerID'];
            $profile->username = $res['username'];

            $profile->youtube = $res['youtube'];
            $profile->twitter = $res['twitter'];
            $profile->twitch = $res['twitch'];

            $profile->rank = $res['rank'];
            $profile->stars = $res['stars'];
            $profile->diamonds = $res['diamonds'];
            $profile->coins = $res['coins'];
            $profile->user_coins = $res['userCoins'];
            $profile->demons = $res['demons'];
            $profile->cp = $res['cp'];

            $profile->moderator = $res['moderator'];

            $profile->friend_requests = $res['friendRequests'];
            $profile->messaging = match ($res['messages']) {
                'all' => 1,
                'friends' => 2,
                'off' => 0,
            };
            $profile->comment_visibility = match ($res['commentHistory']) {
                'all' => 1,
                'friends' => 2,
                'off' => 0,
            };;

            $profile->icon = $res['icon'];
            $profile->ship = $res['ship'];
            $profile->ball = $res['ball'];
            $profile->ufo = $res['ufo'];
            $profile->wave = $res['wave'];
            $profile->robot = $res['robot'];
            $profile->spider = $res['spider'];
            $profile->col1 = $res['col1'];
            $profile->col2 = $res['col2'];
            $profile->death = $res['deathEffect'];
            $profile->glow = $res['glow'];

            $profile->save();
        }

        return $profile;
    }
}
