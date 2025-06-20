<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminForumController;
use App\Http\Controllers\Admin\AdminPermissionController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminUserController;
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
use App\Http\Controllers\Dashboard\DashboardConnectionsController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\Game\LevelController;
use App\Http\Controllers\Game\LevelReplayController;
use App\Http\Controllers\Game\ProfileController;
use App\Http\Controllers\Game\RouletteController;
use App\Http\Controllers\Game\StencilController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Moderation\ModerationDashboardController;
use App\Http\Controllers\Moderation\ReportController;
use App\Http\Controllers\System\BanController;
use App\Http\Controllers\System\MessageController;
use App\Http\Controllers\System\NameChangeController;
use App\Http\Controllers\System\NotificationController;
use App\Http\Controllers\System\ProfileCommentController;
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
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
//Route::get('/news', [HomeController::class, 'news'])->name('news');
Route::get('/levels__', [HomeController::class, 'levels'])->name('levels');
Route::get('/levels/random', [LevelController::class, 'random'])->name('levels.random');

Route::get('/search', [SearchController::class, 'index'])->name('search')->middleware(['auth', 'verified']);

Route::get('/download/{id}', [DownloadController::class, '__invoke'])->name('download');
//Route::get('/upload', function (Request $request) {})->middleware(['auth']);

Route::group(['prefix' => '/system', 'middleware' => ['auth', 'verified', 'password.confirm', 'role:admin']], function () {
    Route::get('/', [AdminController::class, 'show'])->name('system.home');
    Route::post('/', [AdminController::class, '__invoke']);

    Route::get('/users', [AdminUserController::class, 'show'])->name('system.users');
    Route::post('/users', [AdminUserController::class, '__invoke']);

    Route::get('/settings', [AdminSettingController::class, 'show'])->name('system.settings');
    Route::post('/settings', [AdminSettingController::class, '__invoke']);

    Route::get('/permissions', [AdminPermissionController::class, 'show'])->name('system.permissions');
    Route::post('/permissions', [AdminPermissionController::class, '__invoke']);

    Route::get('/forums', [AdminForumController::class, 'index'])->name('system.forums');
    Route::get('/forum/{forum}', [AdminForumController::class, 'show'])->name('system.forums.show');
    Route::post('/forums', [AdminForumController::class, '__invoke']);

    Route::get('/groups', [AdminPermissionController::class, 'show'])->name('system.groups');
    Route::post('/groups', [AdminPermissionController::class, '__invoke']);

    Route::get('/cosmetics', [AdminPermissionController::class, 'show'])->name('system.cosmetics');
    Route::post('/cosmetics', [AdminPermissionController::class, '__invoke']);
});

Route::group(['prefix' => '/moderation', 'middleware' => ['auth', 'verified', 'password.confirm', 'role:moderator']], function () {
    Route::get('/', [ModerationDashboardController::class, 'index'])->name('moderation.dashboard');
    Route::post('/ban', [ModerationDashboardController::class, 'ban'])->name('moderation.ban');
    Route::get('/reports', [ReportController::class, 'index'])->name('moderation.reports.index');
    Route::get('/report/{report:id}', [ReportController::class, 'show'])->name('moderation.reports.show');
    Route::patch('/report/{report:id}', [ReportController::class, 'update'])->name('moderation.reports.update');
});

Route::post('/reports/new', [ReportController::class, 'store'])->name('reports.store')->middleware(['auth', 'verified']);

Route::group(['prefix' => '/settings', 'middleware' => ['auth']], function () {
    Route::get('/', [DashboardController::class, 'home'])->name('settings.home');
    Route::post('/', DashboardController::class)->name('settings.update');
    Route::get('/account', [DashboardController::class, 'account'])->name('settings.account');

    Route::get('/profile', [DashboardController::class, 'profile'])->name('settings.profile')->middleware(['verified']);

    Route::get('/connections', [DashboardConnectionsController::class, 'show'])->name('settings.connections')->middleware(['verified']);
    Route::post('/connections', [DashboardConnectionsController::class, 'update'])->middleware(['verified']);
});

Route::get('/replays', [LevelReplayController::class, 'index'])->name('replays.index');
Route::get('/replays/new', [LevelReplayController::class, 'create'])->name('replays.create')->middleware(['auth', 'verified']);
Route::post('/replays/new', [LevelReplayController::class, 'store'])->name('replays.store')->middleware(['auth', 'verified']);

Route::get('/groups', function () {
    return page('Groups/Index', [
        'groups' => [
            [
                'name' => 'Hyper',
                'description' => 'Those with the power to create. Levantate ponte hyper.'
            ],
            [
                'name' => 'Writers',
                'description' => 'Only good takes havers. Write for the news page.'
            ],
            [
                'name' => 'Janitors',
                'description' => 'Help clean up garbage'
            ]
        ],
        'owner' => \App\Models\System\User::query()->oldest()->first()
    ])->meta('User Groups', 'Discover site communities');
})->name('groups.index');

Route::get('/news', [\App\Http\Controllers\ArticleController::class, 'index'])->name('news');
//Route::get('/news/{article}', [\App\Http\Controllers\ArticleController::class, 'show'])->name('articles.show');
//Route::get('/articles/new', [\App\Http\Controllers\ArticleController::class, 'create'])->name('articles.create');
//Route::post('/articles/new', [\App\Http\Controllers\ArticleController::class, 'store'])->name('articles.store');

Route::get('/profiles', [ProfileController::class, 'index'])->name('profiles.index');
Route::get('/profile/{profile:name}', [ProfileController::class, 'show'])->name('profiles.show');

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/user/{user:id}', [UserController::class, 'show'])->name('users.show');

Route::get('/user/{user:id}/reviews', [UserController::class, 'reviews'])->name('users.reviews');
Route::get('/user/{user:id}/posts', [UserController::class, 'posts'])->name('users.posts');
Route::get('/user/{user:id}/playlists', [UserController::class, 'playlists'])->name('users.playlists');
Route::get('/user/{user:id}/videos', [UserController::class, 'videos'])->name('users.videos');

Route::get('/user/{id}/names', [NameChangeController::class, 'index'])->name('names.show');
Route::get('/user/{user:id}/reputation', [ReputationLogController::class, 'index'])->name('reputation.show');
Route::post('/user/{user:id}/reputation', [ReputationLogController::class, 'store'])->name('reputation.store')->middleware(['auth', 'verified', 'throttle:10,5']);
Route::delete('/user/{user:id}/reputation', [ReputationLogController::class, 'destroy'])->name('reputation.destroy')->middleware(['auth', 'verified']); // TODO: finish this
Route::get('/user/{id}/reviews', [ReputationLogController::class, 'index'])->name('user.reviews.show');
Route::post('/user/{user:id}/comments', [ProfileCommentController::class, 'store'])->name('user.comments.store')->middleware(['auth', 'verified', 'throttle:10,10']);
Route::delete('/user/comment/{comment:id}', [ProfileCommentController::class, 'destroy'])->name('user.comments.destroy')->middleware(['auth', 'verified', 'throttle:50,10']);

Route::get('/bans', [BanController::class, 'index'])->name('bans.index');

Route::get('/forums', [ForumController::class, 'index'])->name('forums.index');
Route::get('/forum/{slug}', [ForumController::class, 'show'])->name('forums.show');

Route::get('/thread/create', [ThreadController::class, 'create'])->name('threads.create')->middleware(['auth', 'verified']);
Route::post('/thread/create', [ThreadController::class, 'store'])->name('threads.store')->middleware(['auth', 'verified', 'throttle:5,10']);
Route::get('/thread/{thread}', [ThreadController::class, 'show'])->name('threads.show');
Route::patch('/thread/{thread}/lock', [ThreadController::class, 'lock'])->name('threads.lock')->middleware(['auth', 'verified']);
Route::get('/thread/{thread}/edit', [ThreadController::class, 'edit'])->name('threads.edit')->middleware(['auth', 'verified']);
Route::post('/thread/{thread}/edit', [ThreadController::class, 'update'])->name('threads.update')->middleware(['auth', 'verified']);
Route::delete('/thread/{thread}', [ThreadController::class, 'destroy'])->name('threads.destroy')->middleware(['auth', 'verified']);

Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create')->middleware(['auth', 'verified']);
Route::post('/posts/create', [PostController::class, 'store'])->name('posts.store')->middleware(['auth', 'verified', 'throttle:30,10']);
Route::get('/post/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/post/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
Route::post('/post/{post}/edit', [PostController::class, 'update'])->name('posts.update');
Route::post('/post/{post}/like', [ReactionController::class, 'store'])->name('likes.store')->middleware(['auth', 'verified']);

Route::get('/levels', [LevelController::class, 'index'])->name('levels.index');
Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews.index');
Route::get('/review/{review:id}', [ReviewController::class, 'show'])->name('reviews.show');

Route::get('/level/{id}', [LevelController::class, 'show'])->name('levels.show');
Route::get('/level/{level:id}/view', [LevelController::class, 'view'])->name('levels.view');

Route::get('/level/{level:id}/reviews', [LevelController::class, 'reviews'])->middleware(\App\Http\Middleware\EnsureEmailIsVerifiedIfAuthenticated::class)->name('levels.reviews.show');
Route::get('/level/{level:id}/replays', [LevelController::class, 'replays'])->name('levels.replays.show');
Route::get('/level/{level:id}/videos', [LevelController::class, 'videos'])->name('levels.videos.show');
Route::get('/level/{level:id}/images', [LevelController::class, 'images'])->name('levels.images.show');

Route::get('/level/{level:id}/edit', [LevelController::class, 'edit'])->name('levels.edit')->middleware(['auth', 'verified', 'role:admin']);
Route::post('/level/{level:id}/edit', [LevelController::class, 'update'])->name('levels.update')->middleware(['auth', 'verified', 'role:admin']);

Route::get('/level/{level:id}/tags', [LevelController::class, 'tags'])->name('levels.tags.show');
Route::post('/level/{level:id}/tags', [LevelTagVoteController::class, 'store'])->name('levels.tags.store')->middleware(['auth', 'verified']);

Route::get('/tags', [LevelTagController::class, 'index'])->name('tags.index');
Route::post('/tags/create', [LevelTagController::class, 'store'])->name('tags.store')->middleware(['auth', 'verified', 'role:admin']);
Route::get('/tag/{tag}', [LevelTagController::class, 'show'])->name('tags.show');

Route::get('/playlists', [PlaylistController::class, 'index'])->name('playlists.index');
Route::get('/playlists/create', [PlaylistController::class, 'create'])->name('playlists.create')->middleware(['auth', 'verified']);
Route::post('/playlists/create', [PlaylistController::class, 'store'])->name('playlists.store')->middleware(['auth', 'verified']);
Route::get('/playlist/{playlist}', [PlaylistController::class, 'show'])->name('playlists.show');
Route::get('/playlist/{playlist}/edit', [PlaylistController::class, 'edit'])->name('playlists.edit')->middleware(['auth', 'verified']);
Route::post('/playlist/{playlist}/edit', [PlaylistController::class, 'update'])->name('playlists.update')->middleware(['auth', 'verified']);
Route::delete('/playlist/{playlist}', [PlaylistController::class, 'destroy'])->name('playlists.destroy')->middleware(['auth', 'verified']);

Route::get('/playlist/{playlist}/submit', [PlaylistSubmissionController::class, 'create'])->name('submissions.create');
Route::post('/playlist/{playlist}/submit', [PlaylistSubmissionController::class, 'store'])->name('submissions.store');
Route::delete('/playlist-submission/{submission:id}', [PlaylistSubmissionController::class, 'destroy'])->name('submissions.destroy')->middleware(['auth', 'verified']);;

//Route::get('/contests', [ContestController::class, 'index'])->name('contests.index');
//Route::get('/contests/create', [ContestController::class, 'create'])->name('contests.create')->middleware(['auth', 'verified']);
//Route::post('/contests/create', [ContestController::class, 'store'])->name('contests.store')->middleware(['auth', 'verified']);
//Route::get('/contest/{contest}', [ContestController::class, 'show'])->name('contests.show');
//Route::post('/contest/{contest}', [ContestController::class, 'update'])->name('contests.update')->middleware(['auth', 'verified']);
//Route::delete('/contest/{contest}', [ContestController::class, 'destroy'])->name('contests.destroy')->middleware(['auth', 'verified']);

//Route::get('/files', [LevelTagController::class, 'index'])->name('files.index');
//Route::post('/files/create', [LevelTagController::class, 'store'])->name('files.store')->middleware(['auth', 'verified', 'role:admin']);

Route::get('/inbox', [MessageController::class, 'index'])->name('inbox.index')->middleware(['auth', 'verified']);
Route::get('/inbox/new', [MessageController::class, 'create'])->name('inbox.create')->middleware(['auth', 'verified']);
Route::post('/inbox/new', [MessageController::class, 'store'])->name('inbox.store')->middleware(['auth', 'verified', 'throttle:40,10']);
Route::get('/inbox/{id}', [MessageController::class, 'show'])->name('inbox.show')->middleware(['auth', 'verified']);
Route::delete('/inbox/{id}', [MessageController::class, 'destroy'])->name('inbox.destroy')->middleware(['auth', 'verified']);

//Route::get('/mods', [ModController::class, 'index'])->name('mods.index');
//Route::get('/mod/{mod}', [ModController::class, 'show'])->name('mods.show');

Route::get('/styles', [StyleController::class, 'index'])->name('styles.index');
Route::get('/style/{style:id}', [StyleController::class, 'show'])->name('styles.show');
Route::get('/styles/new', [StyleController::class, 'create'])->name('styles.create');
Route::post('/styles/new', [StyleController::class, 'store'])->name('styles.store');

Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::post('/videos/create', [VideoController::class, 'store'])->name('videos.store')->middleware(['auth', 'verified', 'throttle:10,10']);
Route::delete('/video/{video:id}', [VideoController::class, 'destroy'])->name('videos.destroy')->middleware(['auth', 'verified']);

Route::post('/reviews/create', [ReviewController::class, 'store'])->name('reviews.store')->middleware(['auth', 'verified', 'throttle:30,10']);
Route::delete('/reviews/{review:id}/delete', [ReviewController::class, 'destroy'])->name('reviews.destroy')->middleware(['auth', 'verified']);

Route::get('/roulette', [RouletteController::class, '__invoke'])->name('roulette');

Route::inertia('/docs/privacy', 'Docs/PrivacyPolicy')->name('legal.privacy');
Route::inertia('/docs/terms', 'Docs/TermsOfService')->name('legal.terms');

Route::post('/media/upload', [\App\Http\Controllers\System\UploadController::class, 'upload'])->middleware(['auth', 'verified'])->name('media.upload');

Route::get('/stencils', [StencilController::class, 'index'])->name('stencils.index');
Route::get('/stencils/new/interstitial', [StencilController::class, 'interstitial'])->name('stencils.interstitial');
Route::get('/stencils/new', [StencilController::class, 'create'])->middleware(['auth', 'verified'])->name('stencils.create');
Route::post('/stencils/new', [StencilController::class, 'store'])->middleware(['auth', 'verified', 'throttle:25,10'])->name('stencils.store');
Route::get('/stencil/{stencil}', [StencilController::class, 'show'])->name('stencils.show');

//Route::get('/notifications')->middleware(['auth'])->name('notifications.index');
Route::get('/notification/{id}', [NotificationController::class, 'show'])->middleware(['auth'])->name('notifications.read');
Route::get('/notifications/clear', [NotificationController::class, 'update'])->middleware(['auth'])->name('notifications.clear');

Route::get('/tools/sfx', [\App\Http\Controllers\ToolsController::class, 'sfxLibrary'])->name('tools.sfx');
Route::get('/tools/music', [\App\Http\Controllers\ToolsController::class, 'musicLibrary'])->name('tools.music');

//Route::get('/servers', [\App\Http\Controllers\ServerController::class, 'index'])->name('servers.index');

//Route::get('/guide', function () {
//    return page('Guide');
//})->name('guide');
//
//Route::get('/guide/{page}', function (string $page) {
//    $page = rtrim($page, '/');
//    $page = str_replace('/', ' ', $page);
//    $page = ucwords($page);
//    $page = str_replace(' ', '/', $page);
//    if (str_contains($page, '..')) abort(404);
//    if (!file_exists(base_path() . '/resources/js/Pages/Guide/' . $page . '.vue')) abort(404);
//    return page('Guide/' . $page);
//})->where('page', '.*')->name('guide.show');

Route::impersonate();

require_once 'auth.php';
