<?php

namespace Database\Seeders;

use App\Actions\CalculateRatings;
use App\Actions\CalculateReputation;
use App\Models\System\Setting;
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
        if (Storage::disk('local')->exists('version.lock')) Storage::disk('local')->delete('version.lock');
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
        CalculateRatings::all();
        CalculateRatings::rankings();

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
//        $this->command->info('Seeded forge content');

        Artisan::call('app:ratings:calculate');
        $this->command->info('Calculated initial review scores');

        \App\Models\Content\Playlist::factory(5)->create();

        \App\Models\System\ProfileComment::factory(100)->create();
        \App\Models\System\Message::factory(100)->create();
        \App\Models\System\Friend::factory(20)->create();
        $reps = \App\Models\System\ReputationLog::factory(50)->create();
        $this->command->info('Seeded additional profile data');
        CalculateReputation::all();
        $this->command->info('Persisted reputation totals');
    }
}
