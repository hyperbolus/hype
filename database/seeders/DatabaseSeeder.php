<?php

namespace Database\Seeders;

use App\Models\Site;
use App\Models\System\ReputationLog;
use App\Models\System\Setting;
use App\Models\System\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        if (Storage::disk('local')->exists('version.lock')) {
            Storage::disk('local')->delete('version.lock');
        }
        Artisan::call('app:update');

        $navigation = <<<JSON
[
  {
    "name": "Forums",
    "route": "forums.index"
  },
  {
    "name": "Levels",
    "route": "levels",
    "children": [
      {
        "name": "Reviews",
        "route": "levels.index"
      },
      {
        "name": "Playlists",
        "route": "playlists.index"
      },
      {
        "name": "Tags",
        "route": "tags.index"
      }
    ]
  },
  {
    "name": "Mods",
    "route": "mods.index"
  },
  {
    "name": "Texture Packs",
    "route": "styles.index"
  }
]
JSON;
        $setting = new Setting();
        $setting->key = 'navigation';
        $setting->name = 'Navigation';
        $setting->value = $navigation;
        $setting->type = 4;
        $setting->public = true;
        $setting->save();

        $this->command->info('Finished Setup');

        $users = \App\Models\System\User::factory(20)->create();
        $levels = \App\Models\Game\Level::factory(30)->create();
        $reviews = \App\Models\Content\Review::factory(100)->create();

        $this->command->info('Seeded users with levels and reviews');

        \App\Models\Content\Forum::factory(1)->create([
            'name' => 'Official',
            'category' => true,
            'parent_id' => null,
        ]);
        \App\Models\Content\Forum::factory(1)->create([
            'name' => 'General',
            'category' => true,
            'parent_id' => null,
        ]);
        \App\Models\Content\Forum::factory(1)->create([
            'name' => 'Creations',
            'category' => true,
            'parent_id' => null,
        ]);
        \App\Models\Content\Forum::factory(1)->create([
            'name' => 'Mods',
            'parent_id' => 3,
        ]);

        \App\Models\Content\Forum::factory(7)->create();
        $this->command->info('Seeded forums');
        \App\Models\Content\Thread::factory(25)->create();
        $this->command->info('Seeded threads');
        //\App\Models\Content\Reaction::factory(100)->create();
        //$this->command->info('Seeded forum content');

//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'BetterInfo',
//            'blurb' => 'Info, but better!',
//            'author' => 'Cvolton',
//            'banner_url' => 'https://geometrydash.eu/mods/img_more-button.png',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Low Capacity Fix',
//            'blurb' => 'IDK what this does',
//            'author' => 'Cvolton',
//            'banner_url' => 'https://geometrydash.eu/mods/img_capacity-fix.png',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Run Info',
//            'blurb' => 'Adds an overlay to the corner of the screen which shows info for practice mode and start pos attempts ',
//            'author' => 'matcool',
//            'banner_url' => 'https://matcool.github.io/assets/run-info.c19b60d4.webp',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'RGB Color Input',
//            'blurb' => 'Adds a widget to directly edit the R G and B values of a color channel ',
//            'author' => 'matcool',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Song Search',
//            'blurb' => 'Allows you to search through your saved songs in the song select dialog ',
//            'author' => 'matcool',
//            'banner_url' => 'https://matcool.github.io/assets/song-search.33c64d51.png',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Menu Shaders',
//            'blurb' => 'Replaces the background of the main menu with a custom shader, which can be customized.',
//            'author' => 'matcool',
//            'banner_url' => 'https://matcool.github.io/assets/song-search.33c64d51.png',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Circle Tool',
//            'blurb' => 'Adds a tool to the editor to generate circles by duplicating and rotating objects ',
//            'author' => 'matcool',
//            'banner_url' => 'https://matcool.github.io/assets/circle-tool.800a78c9.png',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Sum Attempts',
//            'blurb' => 'Adds a button to the levels screen that adds up all the attempts in that folder ',
//            'author' => 'matcool',
//            'banner_url' => 'https://matcool.github.io/assets/sum-attempts.ea76499e.png',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Crash Logger',
//            'blurb' => 'Basic logger that logs crashes in a file named crash-log.log',
//            'author' => 'matcool',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Every Key Jumps',
//            'blurb' => 'Allows you to play gd with almost every key in your keyboard',
//            'author' => 'matcool',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Global Clipboard',
//            'blurb' => 'Stores your object clipboard between levels (this is now included in BetterEdit)',
//            'author' => 'matcool',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'FPS Multiplier',
//            'blurb' => ' (MHv6 extension only) Runs the gd physics multiple times a frame, letting you play with the same physics as higher fpses. Note that input delay is still the same, so this won\'t improve playing experience much.',
//            'author' => 'matcool',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Timestamp Fix',
//            'blurb' => 'Fixes level uploaded/updated timestamps always showing up as NA ago',
//            'author' => 'matcool',
//        ]);
//        \App\Models\Forge\Mod::factory(1)->create([
//            'name' => 'Fix Effect Lines',
//            'blurb' => 'Fixes trigger effect lines not showing up sometimes',
//            'author' => 'matcool',
//        ]);
//        $this->command->info('Seeded forge content');

        $levels->load('reviews');
        $levels->each(function ($level, $i) {
            $count = 0;
            $total_gameplay = 0;
            $total_difficulty = 0;
            $total_visuals = 0;
            $total_overall = 0;
            foreach ($level->reviews as $review) {
                $count++;
                $total_gameplay += $review->rating_gameplay;
                $total_difficulty += $review->rating_difficulty;
                $total_visuals += $review->rating_visuals;
                $total_overall += $review->rating_overall;
            }
            if ($count >= 1) {
                $level->rating_gameplay = $total_gameplay / $count;
                $level->rating_difficulty = $total_difficulty / $count;
                $level->rating_visuals = $total_visuals / $count;
                $level->rating_overall = $total_overall / $count;
                $level->save();
            }
        });

        $this->command->info('Calculated initial review scores');

        \App\Models\Content\Playlist::factory(5)->create();

        \App\Models\System\ProfileComment::factory(100)->create();
        \App\Models\System\Message::factory(100)->create();
        \App\Models\System\Friend::factory(20)->create();
        $reps = \App\Models\System\ReputationLog::factory(50)->create();
        $this->command->info('Seeded additional profile data');
        $users->each(function (User $user) {
            $user->reputation = ReputationLog::whereRecipientId($user->id)->sum('reputation');
            $user->save();
        });
        $this->command->info('Persisted reputation totals');
    }
}
