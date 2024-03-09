<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Content\Post;
use App\Models\Content\Review;
use App\Models\Content\Video;
use App\Models\System\Setting;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class ToolsController extends Controller
{
    function sfxLibrary(): Responsable
    {
        $library = Cache::get('boomlings:sfxLibrary');
        if (!$library || true) {
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
                if ($i === 0) $library['version'] = (int)explode(',', $res[0][0])[1];
                for ($j = 1; $j < count($res[$i]); $j++) {
                    $bits = explode(',', $res[$i][$j]);
                    switch ($i) {
                        case 0: // File/Folder
                            if ($bits[2]) {
                                $library['folders'][(int)$bits[0]] = [
                                    'name' => $bits[1],
                                    'parent' => (int)$bits[3],
                                ];
                            } else {
                                $library['files'][(int)$bits[0]] = [
                                    'name' => $bits[1],
                                    'parent' => (int)$bits[3],
                                    'bytes' => (int)$bits[4],
                                    'milliseconds' => (int)$bits[5],
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
            ->meta('SFX Browser', 'Browse the official Geometry Dash sound effect library in your browser')
            ->breadcrumbs([
                crumb('Tools', '')
            ]);
    }

    function musicLibrary(): Responsable
    {
        $library = Cache::get('boomlings:musicLibrary');
        if (!$library) {
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
                            for ($k = 0; $k < count($tags); $k++) $tags[$k] = (int)$tags[$k];
                            $library['songs'][(int)$bits[0]] = [
                                'name' => $bits[1],
                                'artist' => (int)$bits[2],
                                'bytes' => (int)$bits[3],
                                'seconds' => (int)$bits[4],
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
    }
}
