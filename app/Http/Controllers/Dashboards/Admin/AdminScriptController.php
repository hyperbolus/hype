<?php

namespace App\Http\Controllers\Dashboards\Admin;

use App\Attributes\Script;
use App\Dashboards\AdminDashboard;
use App\Models\System\Setting;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionException;
use function redirect;

class AdminScriptController extends Controller
{
    /**
     * @throws ReflectionException
     */
    public function __invoke(Request $request, string $script)
    {
        Script::execute($script, $request->all());

//        dispatch(function () use ($class, $method, $request) {
//            $class::$method(...$request->array('arguments'));
//        });

        return back();
    }

    /**
     * @throws ReflectionException
     */
    public function show(): Responsable
    {
        return AdminDashboard::page('system.scripts', [
            'scripts' => Script::scripts(),
        ]);
    }
}
