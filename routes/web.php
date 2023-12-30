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
use App\Http\Controllers\Dashboard\DashboardConnectionsController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\Forge\ModController;
use App\Http\Controllers\Game\LevelController;
use App\Http\Controllers\Game\LevelReplayController;
use App\Http\Controllers\Game\ProfileController;
use App\Http\Controllers\Game\RouletteController;
use App\Http\Controllers\Game\StencilController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\System\MessageController;
use App\Http\Controllers\System\NameChangeController;
use App\Http\Controllers\System\NotificationController;
use App\Http\Controllers\System\ProfileCommentController;
use App\Http\Controllers\System\ReportController;
use App\Http\Controllers\System\ReputationLogController;
use App\Http\Controllers\System\SearchController;
use App\Http\Controllers\System\UploadController;
use App\Http\Controllers\System\UserController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
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
//Route::get('/news', [HomeController::class, 'news'])->name('news');
Route::get('/levels', [HomeController::class, 'levels'])->name('levels');
Route::get('/levels/random', [LevelController::class, 'random'])->name('levels.random');

Route::get('/search', [SearchController::class, 'index'])->name('search')->middleware(['auth', 'verified']);

Route::get('/download/{id}', [DownloadController::class, '__invoke'])->name('download');
//Route::get('/upload', function (Request $request) {})->middleware(['auth']);

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
Route::get('/news/{article}', [\App\Http\Controllers\ArticleController::class, 'show'])->name('articles.show');
Route::get('/articles/new', [\App\Http\Controllers\ArticleController::class, 'create'])->name('articles.create');
Route::post('/articles/new', [\App\Http\Controllers\ArticleController::class, 'store'])->name('articles.store');

Route::get('/profiles', [ProfileController::class, 'index'])->name('profiles.index');
Route::get('/profile/{profile:name}', [ProfileController::class, 'show'])->name('profiles.show');

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/user/{user:id}', [UserController::class, 'show'])->name('users.show');
Route::get('/user/{id}/names', [NameChangeController::class, 'index'])->name('names.show');
Route::get('/user/{id}/reputation', [ReputationLogController::class, 'index'])->name('reputation.show');
Route::post('/user/{id}/reputation', [ReputationLogController::class, 'store'])->name('reputation.store')->middleware(['auth', 'verified']);
Route::get('/user/{id}/reviews', [ReputationLogController::class, 'index'])->name('user.reviews.show');
Route::post('/user/{id}/comments', [ProfileCommentController::class, 'store'])->name('user.comments.store')->middleware(['auth', 'verified', 'throttle:10,10']);

//Route::inertia('/tools/inspector', 'Tools/Inspector', [
//    '__meta_breadcrumbs' => [
//        [
//            'text' => 'Save Inspector',
//            'url' => '/tools/inspector'
//        ]
//    ]
//])->name('tools.inspector');

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
Route::get('/level/{level:id}/view', [LevelController::class, 'view'])->name('levels.view');
Route::get('/level/{level:id}/tags', [LevelController::class, 'tags'])->name('levels.tags.show');
Route::get('/level/{level:id}/reviews', [LevelController::class, 'reviews'])->name('levels.reviews.show');
Route::get('/level/{level:id}/replays', [LevelController::class, 'replays'])->name('levels.replays.show');
Route::get('/level/{level:id}/videos', [LevelController::class, 'videos'])->name('levels.videos.show');
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

//Route::get('/mods', [ModController::class, 'index'])->name('mods.index');
//Route::get('/mod/{mod}', [ModController::class, 'show'])->name('mods.show');

Route::get('/styles', [StyleController::class, 'index'])->name('styles.index');
//Route::get('/style/{style:id}', [StyleController::class, 'show'])->name('styles.show');
//Route::get('/styles/new', [StyleController::class, 'create'])->name('styles.create');
//Route::post('/styles/new', [StyleController::class, 'store'])->name('styles.store');

Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::post('/videos/create', [VideoController::class, 'store'])->name('videos.store')->middleware(['auth', 'verified']);

Route::post('/reviews/create', [ReviewController::class, 'store'])->name('reviews.store')->middleware(['auth', 'verified']);

Route::get('/reports', [ReportController::class, 'index'])->name('reports.index')->middleware(['role:admin', 'auth', 'verified']);
Route::post('/reports/new', [ReportController::class, 'store'])->name('reports.store')->middleware(['auth', 'verified']);

Route::get('/roulette', [RouletteController::class, '__invoke'])->name('roulette');

Route::inertia('/docs/privacy', 'Docs/PrivacyPolicy')->name('legal.privacy');
Route::inertia('/docs/terms', 'Docs/TermsOfService')->name('legal.terms');

Route::post('/media/upload', [UploadController::class, 'upload'])->middleware(['auth', 'verified'])->name('media.upload');

Route::get('/stencils', [StencilController::class, 'index'])->name('stencils.index');
Route::get('/stencils/new/interstitial', [StencilController::class, 'interstitial'])->name('stencils.interstitial');
Route::get('/stencils/new', [StencilController::class, 'create'])->middleware(['auth', 'verified'])->name('stencils.create');
Route::post('/stencils/new', [StencilController::class, 'store'])->middleware(['auth', 'verified'])->name('stencils.store');
Route::get('/stencil/{stencil}', [StencilController::class, 'show'])->name('stencils.show');

//Route::get('/notifications')->middleware(['auth'])->name('notifications.index');
Route::get('/notification/{id}', [NotificationController::class, 'show'])->middleware(['auth'])->name('notifications.read');
Route::get('/notifications/clear', [NotificationController::class, 'update'])->middleware(['auth'])->name('notifications.clear');

Route::get('/tools/sfx', function () {
    $library = Cache::get('boomlings:sfxLibrary');
    if (! $library || true) {
        $secret = '8501f9c2-75ba-4230-8188-51037c4da102';
        $expires = 9_999_999_999;
        $token = base64_urldecode(hash('sha256', $secret . $secret));
        //$res = Http::get('https://geometrydashfiles.b-cdn.net/sfx/sfxLibrary.dat?token=' . $token . '&expires=' . $expires)->body();
        $res = Http::get('https://geometrydashfiles.b-cdn.net/sfx/sfxLibrary.dat')->body();
        $res = mb_convert_encoding($res, 'UTF-8', 'UTF-8');;
        $res = base64_urldecode($res);
        $res = zlib_decode($res);
        $res = explode('|', $res);
        $library = [];
        for ($i = 0; $i < count($res); $i++) {
            $res[$i] = explode(';', $res[$i]);
            array_pop($res[$i]); // Remove trailing ';'
            if ($i === 0) $library['version'] = (int) explode(',', $res[0][0])[1];
            for ($j = 1; $j < count($res[$i]); $j++) {
                $bits = explode(',', $res[$i][$j]);
                switch ($i) {
                    case 0: // File/Folder
                        if ($bits[2]) {
                            $library['folders'][(int)$bits[0]] = [
                                'name' => $bits[1],
                                'parent' => (int) $bits[3],
                            ];
                        } else {
                            $library['files'][(int)$bits[0]] = [
                                'name' => $bits[1],
                                'parent' => (int) $bits[3],
                                'bytes' => (int) $bits[4],
                                'milliseconds' => (int) $bits[5],
                            ];
                        }
                        break;
                    case 1: // Credit
                        $library['credits'][] = [
                            'name' => $bits[0],
                            'website' => $bits[1],
                        ];
                        break;
                }
            }
        }
        $library = json_decode(json_encode($library, JSON_INVALID_UTF8_IGNORE));
        Cache::put('boomlings:sfxLibrary', $library, 60 * 60);
    }
    return page('Tools/SFX', [
        'library' => $library
    ])
        ->meta('SFX Browser', 'Browse the official Geometry Dash sound effect libraryin your browser')
        ->breadcrumbs([
            crumb('Tools', '')
        ]);
})->name('tools.sfx');

//Route::get('/servers', [\App\Http\Controllers\ServerController::class, 'index'])->name('servers.index');


Route::get('/tools/music', function () {
    $library = Cache::get('boomlings:musicLibrary');
    if (! $library) {
        $secret = '8501f9c2-75ba-4230-8188-51037c4da102';
        $expires = 9_999_999_999;
        $token = base64_urldecode(hash('sha256', $secret . $secret));
        //$res = Http::get('https://geometrydashfiles.b-cdn.net/music/musiclibrary.dat?token=' . $token . '&expires=' . $expires)->body();
        $res = Http::get('https://geometrydashfiles.b-cdn.net/music/musiclibrary.dat')->body();
        $res = mb_convert_encoding($res, 'UTF-8', 'UTF-8');;
        $res = base64_urldecode($res);
        $res = zlib_decode($res);
        $res = explode('|', $res);
        $library = [];
        for ($i = 1; $i < count($res); $i++) {
            $res[$i] = explode(';', $res[$i]);
            array_pop($res[$i]); // Remove trailing ';'
            for ($j = 0; $j < count($res[$i]); $j++) {
                $bits = explode(',', $res[$i][$j]);
                switch ($i) {
                    case 1: // Artist
                        $library['artists'][(int)$bits[0]] = [
                            'name' => $bits[1],
                            'website' => empty(trim($bits[2])) ? null : $bits[2],
                            'youtube' => empty(trim($bits[3])) ? null : $bits[3],
                        ];
                        break;
                    case 2: // Song
                        $tags = explode('.', $bits[5]);
                        array_pop($tags);
                        array_shift($tags); // todo: slice?
                        for ($k = 0; $k < count($tags); $k++) $tags[$k] = (int) $tags[$k];
                        $library['songs'][(int)$bits[0]] = [
                            'name' => $bits[1],
                            'artist' => (int) $bits[2],
                            'bytes' =>  (int) $bits[3],
                            'seconds' => (int) $bits[4],
                            'tags' => $tags,
                        ];
                        break;
                    case 3: // Tag
                        $library['tags'][(int)$bits[0]] = [
                            'name' => $bits[1],
                        ];
                        break;
                }
            }
        }
        $library['version'] = $res[0];
        $library = json_decode(json_encode($library, JSON_INVALID_UTF8_IGNORE));
        Cache::put('boomlings:musicLibrary', $library, 60 * 60);
    }
    return page('Tools/Music', [
        'library' => json_decode(json_encode($library, JSON_INVALID_UTF8_IGNORE)) // FIXME: this sucks
    ]);
})->name('tools.music');

Route::get('/guide', function () {
    return page('Guide');
})->name('guide');

Route::get('/guide/{page}', function (string $page) {
    $page = rtrim($page, '/');
    $page = str_replace('/', ' ', $page);
    $page = ucwords($page);
    $page = str_replace(' ', '/', $page);
    if (str_contains($page, '..')) abort(404);
    if (!file_exists(base_path() . '/resources/js/Pages/Guide/' . $page . '.vue')) abort(404);
    return page('Guide/' . $page);
})->where('page', '.*')->name('guide.show');

Route::impersonate();

require_once 'auth.php';
