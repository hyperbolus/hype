<?php

use App\Models\Game\LevelReplay;
use App\Models\Media;
use Hashids\Hashids;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
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

Route::get('/mention', [\App\Http\Controllers\System\SearchController::class, 'username']);
Route::get('/search', [\App\Http\Controllers\System\SearchController::class, 'tagname']);
Route::get('/channel-videos/{id}', function (Request $request, string $id) {
    $apiKey = config('hyperbolus.youtube_token');
    $api = 'https://youtube.googleapis.com/youtube/v3';
    $channel = Http::get("${api}/channels?part=contentDetails&part=snippet&id=${id}&key=${apiKey}")->json();

    $playlistId = $channel['items'][0]['contentDetails']['relatedPlaylists']['uploads'];

    $playlist = Http::get("${api}/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}")->json();

    return $playlist;
});
Route::get('/level/{id}', function ($id) {
    $level = \App\Models\Game\Level::query()->with(['tags'])->withCount(['reviews'])->find($id);
    $level->tags->map(function (\App\Models\Content\Tag $tag) {
        $tag->makeHidden(['model', 'namespace', 'pivot', 'created_at', 'updated_at']);
        $tag->setAttribute('verified', $tag['pivot']['verified']);
        $tag->setAttribute('score', $tag['pivot']['score']);
    });
    $level->setAttribute('reviews_url', \request()->url() . '/reviews');

    return $level;
});

Route::get('/test/lvls', function () {
    $lvls = \App\Models\Game\Level::query()->limit(100)->orderBy('id', 'DESC')->get()->pluck('id')->toArray();
    return join(',', $lvls);
});

Route::get('/test/type26', function () {
    $req = Http::asForm()->withHeaders([
        'User-Agent' => ''
    ])->post('http://www.boomlings.com/database/getGJLevels21.php', [
        'secret' => 'Wmfd2893gb7',
        'gameVersion' => '22',
        'type' => '26',
        'str' => '189628'
    ])->body();

    $levels = collect(explode('|', explode('#', $req)[0]))->mapWithKeys(function ($item) {
        $mapped = gj_map($item, ':');
        return [$mapped[1] => collect($mapped)->mapWithKeys(function ($value, $key) {
            return [\App\Libraries\GJSchema::$level[$key] => $value];
        })];
    });
    return $levels;
});

Route::get('messages', function () {
    $gjp = base64_urlencode(xor_key(config('hyperbolus.gd_password'), '37526'));

    $res = Http::asForm()
        ->withUserAgent('')
        ->post('https://www.boomlings.com/database/getGJMessages20.php', [
            'page' => 0,
            'total' => 0,
            'secret' => 'Wmfd2893gb7',
            'accountID' => config('hyperbolus.gd_account_id'),
            'gjp' => $gjp,
        ])
        ->body();

    $messages = collect(explode('|', $res))->map(function (string $string) {
        return gj_map($string, ':');
    });

    return $messages;
});

Route::get('/level/{id}/reviews', function ($id) {
    $reviews = \App\Models\Content\Review::query()->where('level_id', '=', $id)->where('deleted_at', '=', null)->with('author')->paginate(20);
    $reviews->through(function (\App\Models\Content\Review $review) {
        $review->makeHidden(['user_id', 'approved_at', 'approved_by_id', 'deleted_at']);
        return $review;
    });

    return $reviews;
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

Route::get('/macros', function (Request $request) {
    $macros = \App\Models\Game\LevelReplay::query()->whereNotNull('created_at');

    if ($request->has('format') && $request->string('format')->isNotEmpty()) {
        $macros->whereIn('format', explode(',', $request->string('format')));
    }

    if ($request->has('user_id') && $request->string('user_id')->isNotEmpty()) {
        $macros->where('submitter_id', '=', $request->integer('user_id'));
    }

    if ($request->has('level_id') && $request->string('level_id')->isNotEmpty()) {
        $macros->where('level_id', '=', $request->integer('level_id'));
    }

    return $macros->with(['files', 'level', 'author'])->paginate()->through(function (LevelReplay $replay) {
        $replay->files->transform(function (Media $media) {
            $hashids = new Hashids(bin2hex(Crypt::getKey()), 8);
            $result = $hashids->encode([$media->id, 0]);
            $media->setAttribute('url', route('download', $result));
            return $media;
        });
        return $replay;
    });
});

Route::get('/styles', function () {
    $styles = \App\Models\Forge\Style::query()
        ->with('files')
        ->paginate(10);

    $styles->through(function (\App\Models\Forge\Style $style) {
        $sizes = [
            'sd' => null,
            'hd' => null,
            'uhd' => null
        ];
        $files = $style->files->transform(function (\App\Models\Media $file, int $key) use (&$sizes) {
            $sizes[$file->collection] = $key;
            $file->makeHidden(['owner_id', 'owner_type']);
            $file->setAttribute('url', Storage::disk('contabo')->temporaryUrl($file->path, now()->addHour()));
            return $file;
        });
        $style->setAttribute('sizes', $sizes);
        return $style;
    });

    return $styles;
});
Route::get('/style/{id}', function ($id) {
    $style = \App\Models\Forge\Style::query()->with('files')->findOrFail($id);
    return $style;
});
