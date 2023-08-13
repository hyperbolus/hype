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

Route::get('/mention', [\App\Http\Controllers\System\SearchController::class, 'username']);
Route::get('/search', [\App\Http\Controllers\System\SearchController::class, 'tagname']);
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
