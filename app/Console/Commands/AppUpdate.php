<?php

namespace App\Console\Commands;

use App\Actions\Setup;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class AppUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Runs update scripts';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        if (! Storage::disk('local')->exists('version.lock')) {
            Storage::disk('local')->put('version.lock', 0);
        }

        $version = Storage::disk('local')->get('version.lock');

        Setup::all($version);
    }
}
