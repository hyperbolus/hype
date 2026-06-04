<?php

namespace App\Console\Commands;

use App\Actions\Setup;
use App\Attributes\Script;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ScriptList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'script:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Lists available scripts';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        foreach (Script::scripts() as $class => $methods) {
            $this->info($class);
            foreach ($methods as $method) $this->line('- ' . $method['name']);
        }
    }
}
