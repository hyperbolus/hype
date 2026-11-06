<?php

namespace App\Actions;

use App\Enums\LevelDifficulty;
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
            // Main game level do not get fetched
            if ($level && $level->id <= 20) return $level;

            $batch = \Hyperbolus\Dynamite\Models\Level::batch([$id]);

            // No result
            if (count($batch) === 0) {
                if ($level) return $level;

                if ($abort) abort(400, 'Level could not be fetched');

                return null;
            } else {
                $batch = $batch[0];
            }

            if (!$level) $level = new Level();
            $level->id = $id;
            $level->name = $batch->name;
            $level->creator = $batch->uploader['name'];
//            $level->uploader_player_id = $batch->uploader['player_id'];
            $level->description = $batch->description;

            if ($batch->isAuto) {
                $level->difficulty = LevelDifficulty::Auto;
            } else if ($batch->isDemon) {
                $level->difficulty = [
                    0 => LevelDifficulty::HardDemon,
                    3 => LevelDifficulty::EasyDemon,
                    4 => LevelDifficulty::MediumDemon,
                    5 => LevelDifficulty::InsaneDemon,
                    6 => LevelDifficulty::ExtremeDemon,
                ][$batch->demonDifficulty];
            } else {
                $level->difficulty = [
                    0 => LevelDifficulty::Unrated,
                    10 => LevelDifficulty::Easy,
                    20 => LevelDifficulty::Normal,
                    30 => LevelDifficulty::Hard,
                    40 => LevelDifficulty::Harder,
                    50 => LevelDifficulty::Insane,
                ][$batch->difficultyNumerator];
            }

            $level->featured = (bool)$batch->featureScore;
            $level->epic = $batch->epicRating;
            $level->coins_verified = $batch->verifiedCoins;
            $level->coins = $batch->coins;
            $level->stars = $batch->stars;
            if ($batch->officialSong === 0) {
                $level->song_id = $batch?->song[1] ?? null;
                $level->song_url = $batch?->song[10] ?? null;
            }
            $level->song_name = $batch?->song[2] ?? null;
            $level->song_author = $batch?->song[4] ?? null;
            $level->objects = $batch->objects;
            $level->downloads = $batch->downloads;
            $level->likes = $batch->likes;
            $level->length = $batch->length;
            $level->last_fetched_at = now();

            $level->save();

            // re-fetch from database (w/ defaults and query)
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
