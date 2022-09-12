<?php

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
Route::get('/', [\App\Http\Controllers\HomeController::class, 'home'])->name('home');
Route::get('/forge', [\App\Http\Controllers\HomeController::class, 'forge'])->name('forge');
Route::get('/levels', [\App\Http\Controllers\HomeController::class, 'levels'])->name('levels');
Route::get('/client', [\App\Http\Controllers\HomeController::class, 'client'])->name('client');
Route::get('/admin', [\App\Http\Controllers\AdminController::class, 'show'])->name('admin');
Route::post('/admin', \App\Http\Controllers\AdminController::class);

Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'show'])->name('users.show');
Route::get('/user/{id}/reputation', [\App\Http\Controllers\ReputationLogController::class, 'index'])->name('reputation.show');

Route::get('/forums', [\App\Http\Controllers\ForumController::class, 'index'])->name('forums.index');
Route::get('/forum/{forum}', [\App\Http\Controllers\ForumController::class, 'show'])->name('forums.show');

Route::get('/thread/create', [\App\Http\Controllers\ThreadController::class, 'create'])->name('threads.create')->middleware(['auth', 'verified']);
Route::post('/thread/create', [\App\Http\Controllers\ThreadController::class, 'store'])->name('threads.store')->middleware(['auth', 'verified']);
Route::get('/thread/{thread}', [\App\Http\Controllers\ThreadController::class, 'show'])->name('threads.show');
Route::post('/thread/{thread}', [\App\Http\Controllers\ThreadController::class, 'update'])->name('threads.update')->middleware(['auth', 'verified']);
Route::delete('/thread/{thread}', [\App\Http\Controllers\ThreadController::class, 'destroy'])->name('threads.destroy')->middleware(['auth', 'verified']);

Route::get('/post/create', [\App\Http\Controllers\PostController::class, 'create'])->name('posts.create')->middleware(['auth', 'verified']);
Route::post('/post/create', [\App\Http\Controllers\PostController::class, 'store'])->name('posts.store')->middleware(['auth', 'verified']);
Route::get('/post/{post}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');
Route::post('/post/{post}/like', [\App\Http\Controllers\PostLikeController::class, 'store'])->name('likes.store')->middleware(['auth', 'verified']);

Route::get('/reviews', [\App\Http\Controllers\LevelController::class, 'index'])->name('levels.index');
Route::get('/levels/create', [\App\Http\Controllers\LevelController::class, 'create'])->name('levels.create');
Route::post('/levels/create', [\App\Http\Controllers\LevelController::class, 'store'])->name('levels.store')->middleware(['auth', 'verified']);
Route::get('/level/{id}', [\App\Http\Controllers\LevelController::class, 'show'])->name('levels.show');

Route::get('/playlists', [\App\Http\Controllers\PlaylistController::class, 'index'])->name('playlists.index');
Route::get('/playlists/create', [\App\Http\Controllers\PlaylistController::class, 'create'])->name('playlists.create')->middleware(['auth', 'verified']);
Route::post('/playlists/create', [\App\Http\Controllers\PlaylistController::class, 'store'])->name('playlists.store')->middleware(['auth', 'verified']);
Route::get('/playlists/{playlist}/submit', [\App\Http\Controllers\PlaylistSubmissionController::class, 'create'])->name('submissions.create');
Route::post('/playlists/{playlist}/submit', [\App\Http\Controllers\PlaylistSubmissionController::class, 'store'])->name('submissions.store');
Route::get('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'show'])->name('playlists.show');
Route::post('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'update'])->name('playlists.update')->middleware(['auth', 'verified']);
Route::delete('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'destroy'])->name('playlists.destroy')->middleware(['auth', 'verified']);

Route::get('/contests', [\App\Http\Controllers\ContestController::class, 'index'])->name('contests.index');
Route::get('/contests/create', [\App\Http\Controllers\ContestController::class, 'create'])->name('contests.create')->middleware(['auth', 'verified']);
Route::post('/contests/create', [\App\Http\Controllers\ContestController::class, 'store'])->name('contests.store')->middleware(['auth', 'verified']);
Route::get('/contest/{contest}', [\App\Http\Controllers\ContestController::class, 'show'])->name('contests.show');
Route::post('/contest/{contest}', [\App\Http\Controllers\ContestController::class, 'update'])->name('contests.update')->middleware(['auth', 'verified']);
Route::delete('/contest/{contest}', [\App\Http\Controllers\ContestController::class, 'destroy'])->name('contests.destroy')->middleware(['auth', 'verified']);

Route::get('/mods', [\App\Http\Controllers\PlaylistController::class, 'index'])->name('mods.index');
Route::get('/mods/create', [\App\Http\Controllers\PlaylistController::class, 'create'])->name('mods.create')->middleware(['auth', 'verified']);
Route::post('/mods/create', [\App\Http\Controllers\PlaylistController::class, 'store'])->name('mods.store')->middleware(['auth', 'verified']);
Route::get('/mod/{mod}', [\App\Http\Controllers\PlaylistController::class, 'show'])->name('mods.show');
Route::post('/mod/{mod}', [\App\Http\Controllers\PlaylistController::class, 'update'])->name('mods.update')->middleware(['auth', 'verified']);
Route::delete('/mod/{mod}', [\App\Http\Controllers\PlaylistController::class, 'destroy'])->name('mods.destroy')->middleware(['auth', 'verified']);

Route::get('/styles', [\App\Http\Controllers\PlaylistController::class, 'index'])->name('style.index');
Route::get('/styles/create', [\App\Http\Controllers\PlaylistController::class, 'create'])->name('style.create')->middleware(['auth', 'verified']);
Route::post('/styles/create', [\App\Http\Controllers\PlaylistController::class, 'store'])->name('style.store')->middleware(['auth', 'verified']);
Route::get('/style/{style}', [\App\Http\Controllers\PlaylistController::class, 'show'])->name('style.show');
Route::post('/style/{style}', [\App\Http\Controllers\PlaylistController::class, 'update'])->name('style.update')->middleware(['auth', 'verified']);
Route::delete('/style/{style}', [\App\Http\Controllers\PlaylistController::class, 'destroy'])->name('style.destroy')->middleware(['auth', 'verified']);

Route::get('/videos', [\App\Http\Controllers\VideoController::class, 'index'])->name('videos.index');
Route::post('/videos/create', [\App\Http\Controllers\VideoController::class, 'store'])->name('videos.store')->middleware(['auth', 'verified']);

Route::post('/reviews/create', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store')->middleware(['auth', 'verified']);
