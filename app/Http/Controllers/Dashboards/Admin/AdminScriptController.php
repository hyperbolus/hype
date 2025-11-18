<?php

namespace App\Http\Controllers\Dashboards\Admin;

use App\Attributes\Script;
use App\Dashboards\AdminDashboard;
use Exception;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use ReflectionException;

class AdminScriptController extends Controller
{
    /**
     * @throws ReflectionException
     */
    public function __invoke(Request $request, string $script)
    {
        try {
            Script::execute($script, $request->all());
        } catch (Exception $e) {
            dd($e);
        }

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
