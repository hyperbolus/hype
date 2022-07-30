<?php

use App\Http\Controllers\ProfileController;
use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', [\App\Http\Controllers\HomeController::class, 'home'])->name('home');

Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show'])->name('users.show');

Route::get('/levels', [\App\Http\Controllers\LevelController::class, 'index'])->name('levels.index');
Route::get('/levels/create', [\App\Http\Controllers\LevelController::class, 'create'])->name('levels.create');
Route::post('/levels/create', [\App\Http\Controllers\LevelController::class, 'store'])->name('levels.store')->middleware(['auth', 'verified']);
Route::get('/levels/{id}', [\App\Http\Controllers\LevelController::class, 'show'])->name('levels.show');
Route::post('/levels/{id}', [\App\Http\Controllers\LevelController::class, 'update'])->name('levels.update')->middleware(['auth', 'verified']);
Route::delete('/levels/{id}', [\App\Http\Controllers\LevelController::class, 'destroy'])->name('levels.destroy')->middleware(['auth', 'verified']);

Route::get('/videos', [\App\Http\Controllers\VideoController::class, 'index'])->name('videos.index');
Route::post('/videos/create', [\App\Http\Controllers\VideoController::class, 'store'])->name('videos.store')->middleware(['auth', 'verified']);

Route::post('reviews/create', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store')->middleware(['auth', 'verified']);
