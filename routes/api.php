<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mention', [\App\Http\Controllers\System\SearchController::class, 'username']);
Route::get('/search', [\App\Http\Controllers\System\SearchController::class, 'tagname']);
Route::get('/level/{id}', function ($id) {
    $res = Http::get('https://browser.gdps.io/api/level/'.$id);

    return response()->json($res->json());
});

Route::get('avatar', function () {
    $initials = strtoupper(substr(\request()->string('name'), 0, 2));
    $name = \request()->string('name');

    $r = 180;
    $g = 180;
    $b = 180;

    srand(crc32($name));

    $r += rand(0, 1) ? rand(0, 50) : 0;
    $g += rand(0, 1) ? rand(0, 50) : 0;
    $b += rand(0, 1) ? rand(0, 50) : 0;

    $r = dechex($r);
    $g = dechex($g);
    $b = dechex($b);

    $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="256px" height="256px" viewBox="0 0 256 256" version="1.1">
<circle fill="#{$r}{$g}{$b}" cx="128" width="256" height="256" cy="128" r="128"/>
<text x="50%" y="50%" style="color: #000000; line-height: 1;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" alignment-baseline="middle" text-anchor="middle" font-size="112" font-weight="400" dy=".1em" dominant-baseline="middle" fill="#000000">{$initials}</text>
</svg>
SVG;

    return response($svg)->header('Content-Type', 'image/svg+xml');

});
