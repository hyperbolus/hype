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

Route::get('/mention', \App\Http\Controllers\MentionController::class);
Route::get('/search', \App\Http\Controllers\TagSearchController::class);
Route::get('/level/{id}', function ($id) {
    $res = Http::get('https://browser.gdps.io/api/level/' . $id);
    return response()->json($res->json());
});
