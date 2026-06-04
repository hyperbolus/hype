<?php

namespace App\Console\Commands;

use App\Actions\Setup;
use App\Attributes\Script;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ScriptRun extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'script:run {class} {method}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Runs scripts';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $script = $this->argument('class') . '::' . $this->argument('method');

        $start = microtime(true);

        try {
            Script::execute($script, []);
        } catch (Exception $e) {
            dd($e);
        }

        $this->info('Script finished in ' . (microtime(true) - $start));
        $this->info('Peak memory usage was ' . floor(memory_get_peak_usage(true) / 1024 / 1024 * 100) / 100 . 'MB');
    }
}
