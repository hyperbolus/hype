<?php

namespace App;

use Exception;
use Illuminate\Support\Facades\App;
use LuaSandbox;
use LuaSandboxFunction;
use LuaSandboxRuntimeError;

class Luna {
    public LuaSandbox $vm;

    public array $log = [];

    public bool $initialized = false;

    const string LIBRARY = 'hype';

    public function __construct(public string $source) {
        $this->vm = new LuaSandbox();

        try {
            $this->vm->setCPULimit(3);
            $this->vm->setMemoryLimit(10 * 1024 * 1024);
//            $this->vm->registerLibrary(self::LIBRARY, $this->library());

            $this->initialized = true;
        } catch (Exception $e) {
            $this->log[] = $e;
        }
    }

    // TODO@wiki: more advanced runtime library
    public function library(): array
    {
        return [
            'log' => function ($string) {
                $this->log[] = $string;
            },
            'error' => function ($message) {
                if (App::hasDebugModeEnabled()) throw new LuaSandboxRuntimeError($message);
            },
            'dd' => function (...$data) {
                if (App::hasDebugModeEnabled()) dd($data);
            }
        ];
    }

    public function run(): array
    {
        if (!$this->initialized) return [];

        return $this->vm->loadString($this->source)->call();
    }

    public static function exec(string $source): array
    {
        return new Luna($source)->run();
    }

    public static function module(string $module, ?string $function = null, array $parameters = []): string
    {
        $module = Wiki::getModule($module)?->revision?->text->content;

        if (!$module) return 'Module ' . $module . ' not found';

        // Module initialization (should export stuff for us to use)
        $exports = Luna::exec($module);

        if (count($exports) === 0) return 'Module returned no exports';

        // Get first result, discard everything else
        $exports = $exports[0];

        // TODO@Luna: some way to emit warnings on unused function name or parameters when scalar returned immediately

        if (is_array($exports)) {
            if (!$function) return 'Did not specify an identifier for a module with exports';
            // we got exports so access the thing
            // TODO@Luna maybe allow dot notation like thing.sub.subber
            $exports = $exports[$function] ?? null;
        }

        return Luna::moduleWikiOutput($exports, $parameters);
    }

    private static function moduleWikiOutput(mixed $exports, array $parameters): string
    {
        if (!$exports) return 'Module returned no exports';

        if ($exports instanceof LuaSandboxFunction) {
            $result = $exports->call($parameters);

            if (count($result) === 0) return '';
            if (count($result) === 1) return is_scalar($result[0]) ? $result[0] : json_encode($result);

            return json_encode($result->call($parameters));
        } else if (is_scalar($exports)) {
            // returned a scalar
            return $exports;
        } else {
            // returned something we cant print
            return 'Module returned invalid exports';
        }
    }
}
