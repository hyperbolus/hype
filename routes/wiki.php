<?php

use App\Http\Controllers\Wiki\WikiPageController;
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

Route::get('/random', [WikiPageController::class, 'random'])->name('wiki.random');
Route::post('/new', [WikiPageController::class, 'store'])->name('wiki.store')->middleware(['role:wiki_contributor']);
Route::patch('/{page:id}', [WikiPageController::class, 'update'])->name('wiki.update')->middleware(['role:wiki_contributor']);
Route::get('/{path?}', [WikiPageController::class, 'show'])->where(['path' => '(.*)'])->name('wiki');
