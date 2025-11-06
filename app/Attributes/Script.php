<?php

namespace App\Attributes;

use Attribute;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionException;
use ReflectionMethod;

#[Attribute]
class Script {
    /**
     * @param string|null $title
     * @param string|null $description
     * @param string[] $rules
     * @param string[] $permissions
     */
    public function __construct(
        public ?string $title = null,
        public ?string $description = null,
        public array $rules = [],
        public array $permissions = [],
        public bool $singleInstance = true,
    ) {}

    public static function getPath(): string
    {
        return app_path() . '/Scripts/*.php';
    }

    public static function getNamespace(): string
    {
        return '\\App\\Scripts\\';
    }

    /**
     * @throws ReflectionException
     */
    public static function scripts(): array
    {
        $classes = [];

        foreach (glob(static::getPath()) as $filename) {
            // FIXME: trim from namespace rather than only the basename in case of nested directory scripts
            $basename = basename($filename, '.php');

            $class = new ReflectionClass(static::getNamespace() . $basename);

            // Class must have explicit script attribute
            if (count($class->getAttributes(static::class)) !== 1) continue;

            $classes[$basename] = static::classMethods($class);

        }

        return $classes;
    }

    public static function classMethods(ReflectionClass $class): array
    {
        $methods = [];

        foreach ($class->getMethods() as $method) {
            $attr = $method->getAttributes(static::class);

            if (static::hasPermission($method)) $methods[] = [
                'name' => $method->name,
                'parameters' => static::methodParameters($method),
                'attributes' => count($attr) > 0 ? $attr[0]->getArguments() : [],
            ];
        }

        return $methods;
    }

    public static function hasPermission(ReflectionMethod $method): bool
    {
        // TODO@0: script permissions mods or admins or whatever
        return $method->isPublic();
    }

    public static function methodParameters(ReflectionMethod $method): array
    {
        $parameters = [];

        foreach ($method->getParameters() as $parameter) {
            $attr = $parameter->getAttributes(static::class);

            $parameters[] = [
                'name' => $parameter->name,
                'type' => $parameter->getType()->getName(),
                'attributes' => count($attr) > 0 ? $attr[0]->getArguments() : [],
            ];
        }

        return $parameters;
    }

    public static function parameterValidator(ReflectionMethod $method): array
    {
        $validator = [];

        foreach (static::methodParameters($method) as $parameter) {
            $validator[$parameter['name']] = ['required', $parameter['type']];
        }

        return $validator;
    }

    /**
     * @param string $script
     * @return array{class: string, method: string}
     */
    public static function parse(string $script): array
    {
        if (!Str::contains($script, '::')) abort(400, 'Invalid script');

        $class = Script::getNamespace() . Str::before($script, '::');
        $method = Str::after($script, '::');

        if (!class_exists($class)) abort(400, 'Script class ' . $class . ' does not exist');
        if (!method_exists($class, $method)) abort(400, 'Class does not contain method ' . $method);
        if (!is_callable($class . '::' . $method)) abort(400, 'Class method ' . $method . ' is not callable');

        return [
            'class' => $class,
            'method' => $method,
        ];
    }

    /**
     * @throws ReflectionException
     */
    public static function execute(string $script, array $parameters): void
    {
        ['class' => $class, 'method' => $method] = static::parse($script);

        $validator = Validator::make($parameters, static::parameterValidator(new ReflectionMethod($class, $method)));

        if ($validator->fails()) abort(400, 'Invalid parameters');

        $class::$method(...$validator->validated());
    }
}
