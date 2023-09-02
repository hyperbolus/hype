<?php

use App\Http\Controllers\Content\ContestController;
use App\Http\Controllers\Content\ForumController;
use App\Http\Controllers\Content\LevelTagController;
use App\Http\Controllers\Content\LevelTagVoteController;
use App\Http\Controllers\Content\PlaylistController;
use App\Http\Controllers\Content\PlaylistSubmissionController;
use App\Http\Controllers\Content\PostController;
use App\Http\Controllers\Content\ReactionController;
use App\Http\Controllers\Content\ReviewController;
use App\Http\Controllers\Content\StyleController;
use App\Http\Controllers\Content\ThreadController;
use App\Http\Controllers\Content\VideoController;
use App\Http\Controllers\Dashboard\AdminController;
use App\Http\Controllers\Dashboard\AdminForumController;
use App\Http\Controllers\Dashboard\AdminPermissionController;
use App\Http\Controllers\Dashboard\AdminSettingController;
use App\Http\Controllers\Dashboard\AdminUserController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Forge\ModController;
use App\Http\Controllers\Game\LevelController;
use App\Http\Controllers\Game\ProfileController;
use App\Http\Controllers\Game\RouletteController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\System\MessageController;
use App\Http\Controllers\System\NameChangeController;
use App\Http\Controllers\System\ProfileCommentController;
use App\Http\Controllers\System\ReportController;
use App\Http\Controllers\System\ReputationLogController;
use App\Http\Controllers\System\SearchController;
use App\Http\Controllers\System\UserController;
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

Route::domain(config('app.domains.profile'))->group(function () {
    Route::redirect('/', config('app.url'));
    Route::get('/{profile}', [ProfileController::class, 'show']);
});

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('/forge', [HomeController::class, 'forge'])->name('forge');
Route::get('/levels', [HomeController::class, 'levels'])->name('levels');
Route::get('/levels/random', [LevelController::class, 'random'])->name('levels.random');
Route::get('/client', [HomeController::class, 'client'])->name('client');

Route::get('/search', [SearchController::class, 'index'])->name('search')->middleware(['auth', 'verified']);

Route::get('/download/{id}', [\App\Http\Controllers\DownloadController::class, '__invoke'])->middleware(['auth']);
Route::get('/upload', function (Request $request) {

})->middleware(['auth']);

Route::group(['prefix' => '/system', 'middleware' => ['auth', 'verified', 'password.confirm', 'role:admin']], function () {
    Route::get('/', [AdminController::class, 'show'])->name('system.home');
    Route::post('/', AdminController::class);

    Route::get('/users', [AdminUserController::class, 'show'])->name('system.users');
    Route::post('/users', AdminUserController::class);

    Route::get('/settings', [AdminSettingController::class, 'show'])->name('system.settings');
    Route::post('/settings', AdminSettingController::class);

    Route::get('/permissions', [AdminPermissionController::class, 'show'])->name('system.permissions');
    Route::post('/permissions', AdminPermissionController::class);

    Route::get('/forums', [AdminForumController::class, 'index'])->name('system.forums');
    Route::get('/forum/{forum}', [AdminForumController::class, 'show'])->name('system.forums.show');
    Route::post('/forums', AdminForumController::class);

    Route::get('/groups', [AdminPermissionController::class, 'show'])->name('system.groups');
    Route::post('/groups', AdminPermissionController::class);

    Route::get('/cosmetics', [AdminPermissionController::class, 'show'])->name('system.cosmetics');
    Route::post('/cosmetics', AdminPermissionController::class);
});

Route::group(['prefix' => '/settings', 'middleware' => ['auth']], function () {
    Route::get('/', [DashboardController::class, 'home'])->name('settings.home');
    Route::post('/', DashboardController::class)->name('settings.update');
    Route::get('/account', [DashboardController::class, 'account'])->name('settings.account');
    Route::get('/profile', [DashboardController::class, 'profile'])->name('settings.profile');
});

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/user/{user:id}', [UserController::class, 'show'])->name('users.show');
Route::get('/user/{id}/names', [NameChangeController::class, 'index'])->name('names.show');
Route::get('/user/{id}/reputation', [ReputationLogController::class, 'index'])->name('reputation.show');
Route::post('/user/{id}/reputation', [ReputationLogController::class, 'store'])->name('reputation.store')->middleware(['auth', 'verified']);
Route::get('/user/{id}/reviews', [ReputationLogController::class, 'index'])->name('user.reviews.show');
Route::post('/user/{id}/comments', [ProfileCommentController::class, 'store'])->name('user.comments.store')->middleware(['auth', 'verified', 'throttle:10,10']);

Route::get('/forums', [ForumController::class, 'index'])->name('forums.index');
Route::get('/forum/{forum}', [ForumController::class, 'show'])->name('forums.show');

Route::get('/thread/create', [ThreadController::class, 'create'])->name('threads.create')->middleware(['auth', 'verified']);
Route::post('/thread/create', [ThreadController::class, 'store'])->name('threads.store')->middleware(['auth', 'verified']);
Route::get('/thread/{thread}', [ThreadController::class, 'show'])->name('threads.show');
Route::get('/thread/{thread}/edit', [ThreadController::class, 'edit'])->name('threads.edit')->middleware(['auth', 'verified']);
Route::post('/thread/{thread}/edit', [ThreadController::class, 'update'])->name('threads.update')->middleware(['auth', 'verified']);
Route::delete('/thread/{thread}', [ThreadController::class, 'destroy'])->name('threads.destroy')->middleware(['auth', 'verified']);

Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create')->middleware(['auth', 'verified']);
Route::post('/posts/create', [PostController::class, 'store'])->name('posts.store')->middleware(['auth', 'verified']);
Route::get('/post/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/post/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::post('/post/{post}/edit', [PostController::class, 'update'])->name('posts.update');
Route::post('/post/{post}/like', [ReactionController::class, 'store'])->name('likes.store')->middleware(['auth', 'verified']);

Route::get('/reviews', [LevelController::class, 'index'])->name('levels.index');
Route::get('/review/{review:id}', [ReviewController::class, 'show'])->name('reviews.show');
Route::get('/level/{id}', [LevelController::class, 'show'])->name('levels.show');
Route::get('/level/{level:id}/tags', [LevelController::class, 'tags'])->name('levels.tags.show');
Route::post('/level/{level:id}/tags', [LevelTagVoteController::class, 'store'])->name('levels.tags.store')->middleware(['auth', 'verified']);
Route::get('/level/{level:id}/images', [LevelController::class, 'images'])->name('levels.images.show');
//Route::post('/level/{level:id}/tags', [LevelTagVoteController::class, 'store'])->name('levels.tags.store')->middleware(['auth', 'verified']);
Route::get('/level/{level:id}/edit', [LevelController::class, 'edit'])->name('levels.edit')->middleware(['auth', 'verified', 'role:admin']);
Route::post('/level/{level:id}/edit', [LevelController::class, 'update'])->name('levels.update')->middleware(['auth', 'verified', 'role:admin']);

Route::get('/playlists', [PlaylistController::class, 'index'])->name('playlists.index');
Route::get('/playlists/create', [PlaylistController::class, 'create'])->name('playlists.create')->middleware(['auth', 'verified']);
Route::post('/playlists/create', [PlaylistController::class, 'store'])->name('playlists.store')->middleware(['auth', 'verified']);
Route::get('/playlist/{playlist}', [PlaylistController::class, 'show'])->name('playlists.show');
Route::get('/playlist/{playlist}/edit', [PlaylistController::class, 'edit'])->name('playlists.edit')->middleware(['auth', 'verified']);
Route::post('/playlist/{playlist}/edit', [PlaylistController::class, 'update'])->name('playlists.update')->middleware(['auth', 'verified']);
Route::delete('/playlist/{playlist}', [PlaylistController::class, 'destroy'])->name('playlists.destroy')->middleware(['auth', 'verified']);

Route::get('/playlist/{playlist}/submit', [PlaylistSubmissionController::class, 'create'])->name('submissions.create');
Route::post('/playlist/{playlist}/submit', [PlaylistSubmissionController::class, 'store'])->name('submissions.store');

Route::get('/contests', [ContestController::class, 'index'])->name('contests.index');
Route::get('/contests/create', [ContestController::class, 'create'])->name('contests.create')->middleware(['auth', 'verified']);
Route::post('/contests/create', [ContestController::class, 'store'])->name('contests.store')->middleware(['auth', 'verified']);
Route::get('/contest/{contest}', [ContestController::class, 'show'])->name('contests.show');
Route::post('/contest/{contest}', [ContestController::class, 'update'])->name('contests.update')->middleware(['auth', 'verified']);
Route::delete('/contest/{contest}', [ContestController::class, 'destroy'])->name('contests.destroy')->middleware(['auth', 'verified']);

//Route::get('/files', [LevelTagController::class, 'index'])->name('files.index');
//Route::post('/files/create', [LevelTagController::class, 'store'])->name('files.store')->middleware(['auth', 'verified', 'role:admin']);

Route::get('/tags', [LevelTagController::class, 'index'])->name('tags.index');
Route::post('/tags/create', [LevelTagController::class, 'store'])->name('tags.store')->middleware(['auth', 'verified', 'role:admin']);
Route::get('/tag/{tag}', [LevelTagController::class, 'show'])->name('tags.show');

Route::get('/inbox', [MessageController::class, 'index'])->name('inbox.index')->middleware(['auth', 'verified']);
Route::get('/inbox/new', [MessageController::class, 'create'])->name('inbox.create')->middleware(['auth', 'verified']);
Route::post('/inbox/new', [MessageController::class, 'store'])->name('inbox.store')->middleware(['auth', 'verified']);
Route::get('/inbox/{id}', [MessageController::class, 'show'])->name('inbox.show')->middleware(['auth', 'verified']);
Route::delete('/inbox/{id}', [MessageController::class, 'destroy'])->name('inbox.destroy')->middleware(['auth', 'verified']);

Route::get('/mods', [ModController::class, 'index'])->name('mods.index');
Route::get('/mod/{mod}', [ModController::class, 'show'])->name('mods.show');


Route::get('/styles', [StyleController::class, 'index'])->name('styles.index');

Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::post('/videos/create', [VideoController::class, 'store'])->name('videos.store')->middleware(['auth', 'verified']);

Route::post('/reviews/create', [ReviewController::class, 'store'])->name('reviews.store')->middleware(['auth', 'verified']);

Route::get('/reports', [ReportController::class, 'index'])->name('reports.index')->middleware(['role:admin', 'auth', 'verified']);
Route::post('/reports/new', [ReportController::class, 'store'])->name('reports.store')->middleware(['auth', 'verified']);

Route::get('/roulette', [RouletteController::class, '__invoke'])->name('roulette');

Route::inertia('/docs/privacy', 'Docs/PrivacyPolicy')->name('legal.privacy');
Route::inertia('/docs/terms', 'Docs/TermsOfService')->name('legal.terms');

Route::post('/media/upload', [\App\Http\Controllers\System\UploadController::class, 'upload'])->middleware(['auth', 'verified'])->name('media.upload');

//Route::get('/notifications')->middleware(['auth'])->name('notifications.index');
Route::get('/notification/{id}', [\App\Http\Controllers\System\NotificationController::class, 'show'])->middleware(['auth'])->name('notifications.read');
Route::get('/notifications/clear', [\App\Http\Controllers\System\NotificationController::class, 'update'])->middleware(['auth'])->name('notifications.clear');

Route::impersonate();


require_once 'auth.php';
