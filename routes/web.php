<?php

use Illuminate\Support\Facades\DB;
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

Route::get('/search', [\App\Http\Controllers\SearchController::class, 'index'])->name('search')->middleware(['auth', 'verified']);

Route::group(['prefix' => '/system', 'middleware' => ['auth', 'verified', 'password.confirm', 'role:admin']], function() {
    Route::get('/', [\App\Http\Controllers\Admin\AdminController::class, 'show'])->name('system.home');
    Route::post('/', \App\Http\Controllers\Admin\AdminController::class);

    Route::get('/users', [\App\Http\Controllers\Admin\AdminUserController::class, 'show'])->name('system.users');
    Route::post('/users', \App\Http\Controllers\Admin\AdminUserController::class);

    Route::get('/permissions', [\App\Http\Controllers\Admin\AdminPermissionController::class, 'show'])->name('system.permissions');
    Route::post('/permissions', \App\Http\Controllers\Admin\AdminPermissionController::class);

    Route::get('/forums', [\App\Http\Controllers\Admin\AdminForumController::class, 'index'])->name('system.forums');
    Route::get('/forum/{forum}', [\App\Http\Controllers\Admin\AdminForumController::class, 'show'])->name('system.forums.show');
    Route::post('/forums', \App\Http\Controllers\Admin\AdminForumController::class);

    Route::get('/groups', [\App\Http\Controllers\Admin\AdminPermissionController::class, 'show'])->name('system.groups');
    Route::post('/groups', \App\Http\Controllers\Admin\AdminPermissionController::class);

    Route::get('/cosmetics', [\App\Http\Controllers\Admin\AdminPermissionController::class, 'show'])->name('system.cosmetics');
    Route::post('/cosmetics', \App\Http\Controllers\Admin\AdminPermissionController::class);
});

Route::group(['prefix' => '/settings', 'middleware' => ['auth']], function() {
    Route::get('/', [\App\Http\Controllers\Dashboard\DashboardController::class, 'home'])->name('settings.home');
    Route::get('/account', [\App\Http\Controllers\Dashboard\DashboardController::class, 'account'])->name('settings.account');
    Route::get('/profile', [\App\Http\Controllers\Dashboard\DashboardController::class, 'profile'])->name('settings.profile');
    Route::post('/', \App\Http\Controllers\Dashboard\DashboardController::class)->name('settings.update');
});

Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'show'])->name('users.show');
Route::get('/user/{id}/names', [\App\Http\Controllers\NameChangeController::class, 'index'])->name('names.show');
Route::get('/user/{id}/reputation', [\App\Http\Controllers\ReputationLogController::class, 'index'])->name('reputation.show');
Route::post('/user/{id}/reputation', [\App\Http\Controllers\ReputationLogController::class, 'store'])->name('reputation.store')->middleware(['auth', 'verified']);
Route::get('/user/{id}/reviews', [\App\Http\Controllers\ReputationLogController::class, 'index'])->name('user.reviews.show');
Route::post('/user/{id}/comments', [\App\Http\Controllers\ProfileCommentController::class, 'store'])->name('user.comments.store')->middleware(['auth', 'verified', 'throttle:10,10']);

Route::get('/forums', [\App\Http\Controllers\ForumController::class, 'index'])->name('forums.index');
Route::get('/forum/{forum}', [\App\Http\Controllers\ForumController::class, 'show'])->name('forums.show');

Route::get('/thread/create', [\App\Http\Controllers\ThreadController::class, 'create'])->name('threads.create')->middleware(['auth', 'verified']);
Route::post('/thread/create', [\App\Http\Controllers\ThreadController::class, 'store'])->name('threads.store')->middleware(['auth', 'verified']);
Route::get('/thread/{thread}', [\App\Http\Controllers\ThreadController::class, 'show'])->name('threads.show');
Route::post('/thread/{thread}', [\App\Http\Controllers\ThreadController::class, 'update'])->name('threads.update')->middleware(['auth', 'verified']);
Route::delete('/thread/{thread}', [\App\Http\Controllers\ThreadController::class, 'destroy'])->name('threads.destroy')->middleware(['auth', 'verified']);

Route::get('/posts/create', [\App\Http\Controllers\PostController::class, 'create'])->name('posts.create')->middleware(['auth', 'verified']);
Route::post('/posts/create', [\App\Http\Controllers\PostController::class, 'store'])->name('posts.store')->middleware(['auth', 'verified']);
Route::get('/posts/{post}', [\App\Http\Controllers\PostController::class, 'show'])->name('posts.show');
Route::post('/posts/{post}/like', [\App\Http\Controllers\PostLikeController::class, 'store'])->name('likes.store')->middleware(['auth', 'verified']);

Route::get('/reviews', [\App\Http\Controllers\LevelController::class, 'index'])->name('levels.index');
Route::get('/level/{id}', [\App\Http\Controllers\LevelController::class, 'show'])->name('levels.show');
Route::get('/level/{level:id}/tags', [\App\Http\Controllers\LevelController::class, 'tags'])->name('levels.tags.show');
Route::post('/level/{level:id}/tags', [\App\Http\Controllers\LevelTagVoteController::class, 'store'])->name('levels.tags.store')->middleware(['auth', 'verified']);
Route::get('/level/{level:id}/edit', [\App\Http\Controllers\LevelController::class, 'edit'])->name('levels.edit')->middleware(['auth', 'verified', 'role:admin']);
Route::post('/level/{level:id}/edit', [\App\Http\Controllers\LevelController::class, 'update'])->name('levels.update')->middleware(['auth', 'verified', 'role:admin']);

Route::get('/playlists', [\App\Http\Controllers\PlaylistController::class, 'index'])->name('playlists.index');
Route::get('/playlists/create', [\App\Http\Controllers\PlaylistController::class, 'create'])->name('playlists.create')->middleware(['auth', 'verified']);
Route::post('/playlists/create', [\App\Http\Controllers\PlaylistController::class, 'store'])->name('playlists.store')->middleware(['auth', 'verified']);
Route::get('/playlist/{playlist}/submit', [\App\Http\Controllers\PlaylistSubmissionController::class, 'create'])->name('submissions.create');
Route::post('/playlist/{playlist}/submit', [\App\Http\Controllers\PlaylistSubmissionController::class, 'store'])->name('submissions.store');
Route::get('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'show'])->name('playlists.show');
Route::post('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'update'])->name('playlists.update')->middleware(['auth', 'verified']);
Route::delete('/playlist/{playlist}', [\App\Http\Controllers\PlaylistController::class, 'destroy'])->name('playlists.destroy')->middleware(['auth', 'verified']);

Route::get('/contests', [\App\Http\Controllers\ContestController::class, 'index'])->name('contests.index');
Route::get('/contests/create', [\App\Http\Controllers\ContestController::class, 'create'])->name('contests.create')->middleware(['auth', 'verified']);
Route::post('/contests/create', [\App\Http\Controllers\ContestController::class, 'store'])->name('contests.store')->middleware(['auth', 'verified']);
Route::get('/contest/{contest}', [\App\Http\Controllers\ContestController::class, 'show'])->name('contests.show');
Route::post('/contest/{contest}', [\App\Http\Controllers\ContestController::class, 'update'])->name('contests.update')->middleware(['auth', 'verified']);
Route::delete('/contest/{contest}', [\App\Http\Controllers\ContestController::class, 'destroy'])->name('contests.destroy')->middleware(['auth', 'verified']);

Route::get('/tags', [\App\Http\Controllers\LevelTagController::class, 'index'])->name('tags.index');
Route::get('/tag/{tag}', [\App\Http\Controllers\LevelTagController::class, 'show'])->name('tags.show');

Route::get('/inbox', [\App\Http\Controllers\MessageController::class, 'index'])->name('inbox.index')->middleware(['auth', 'verified']);
Route::get('/inbox/new', [\App\Http\Controllers\MessageController::class, 'create'])->name('inbox.create')->middleware(['auth', 'verified']);
Route::post('/inbox/new', [\App\Http\Controllers\MessageController::class, 'store'])->name('inbox.store')->middleware(['auth', 'verified']);
Route::get('/inbox/{id}', [\App\Http\Controllers\MessageController::class, 'show'])->name('inbox.show')->middleware(['auth', 'verified']);
Route::delete('/inbox/{id}', [\App\Http\Controllers\MessageController::class, 'destroy'])->name('inbox.destroy')->middleware(['auth', 'verified']);

Route::get('/videos', [\App\Http\Controllers\VideoController::class, 'index'])->name('videos.index');
Route::post('/videos/create', [\App\Http\Controllers\VideoController::class, 'store'])->name('videos.store')->middleware(['auth', 'verified']);

Route::post('/reviews/create', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store')->middleware(['auth', 'verified']);

Route::get('/reports/new', [\App\Http\Controllers\ReportController::class, 'create'])->name('reports.create')->middleware(['auth', 'verified']);
Route::post('/reports/new', [\App\Http\Controllers\ReportController::class, 'store'])->name('reports.store')->middleware(['auth', 'verified']);

Route::impersonate();
