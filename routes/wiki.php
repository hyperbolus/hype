<?php

use App\Http\Controllers\System\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Wiki\WikiPageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/auth/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth');

Route::get('/auth/recapture', function (Request $request) {
    if (!$request->hasValidSignature()) abort(400, 'Insecure session migration');
    if ($request->string('ip') != $request->ip()) abort(400, 'Insecure session migration');

    $session = \Illuminate\Support\Facades\Crypt::decryptString($request->string('session')->toString());

    session()->setId($session);
    session()->start();

    return redirect('/');
})->name('auth::recapture');

Route::get('/random', [WikiPageController::class, 'random'])->name('wiki.random');

Route::get('/{path?}', [WikiPageController::class, 'show'])->where(['path' => '(.*)'])->name('wiki');

Route::post('/new', [WikiPageController::class, 'store'])->name('wiki.store')->middleware(['role:admin']);
Route::patch('/{page:id}', [WikiPageController::class, 'update'])->name('wiki.update')->middleware(['role:admin']);
