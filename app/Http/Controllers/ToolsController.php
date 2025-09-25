<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ToolsController extends Controller
{
    private string $cdn = 'https://geometrydashfiles.b-cdn.net/';
    private string $libpath = 'boomlings/libraries/';

    private function signURL($url): string
    {
        $secret = '8501f9c2-75ba-4230-8188-51037c4da102';
        $expires = 9_999_999_999;
        $token = base64_urlencode(hash('sha256', $secret . parse_url($url, PHP_URL_PATH) . $expires));

        return $url . '?token=' . $token . '&expires=' . $expires;
    }

    function sfxLibrary(): Responsable
    {
        $library = Cache::get('boomlings:sfxLibrary');
        if (!$library) {
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
            Cache::put('boomlings:sfxLibrary', $library, now()->addHour());
        }
        return page('Tools/SFX', [
            'library' => $library
        ])
            ->meta('SFX Browser', 'Browse the official Geometry Dash sound effect library in your browser, unofficially!')
            ->breadcrumbs([
                crumb('Tools', '')
            ]);
    }

    function musicLibrary(): Responsable
    {
        $disk = Storage::disk('contabo');
        $path = $this->libpath . 'music/';

        $latest = Http::get($this->cdn . 'music/musiclibrary_version_02.txt')->body();
        $library = $disk->get('musiclibrary_02_' . $latest . '.json');

        if (!$library) {
            $res = Http::get($this->cdn . 'music/musiclibrary_02.dat')->body();
            $data = mb_convert_encoding($res, 'UTF-8', 'UTF-8');
            $data = base64_urldecode($data);
            $data = zlib_decode($data);
            $data = Str::replace('(ft. Malou, NOEP)', '(ft. Malou & NOEP)', $data);
            $data = explode('|', $data);
            $library = [];
            for ($i = 1; $i < count($data); $i++) {
                $data[$i] = explode(';', $data[$i]);
                array_pop($data[$i]); // Remove trailing ';'
                for ($j = 0; $j < count($data[$i]); $j++) {
                    $bits = explode(',', $data[$i][$j]);
                    switch ($i) {
                        case 1: // Artist
                            $library['artists'][(int)$bits[0]] = [
                                'id' => (int)$bits[0],
                                'name' => $bits[1],
                                'website' => empty(trim($bits[2])) ? null : $bits[2],
                                'youtube' => empty(trim($bits[3])) ? null : $bits[3],
                            ];
                            break;
                        case 2: // Song
                            $tags = explode('.', trim($bits[5], '.'));
                            $additionalArtists = explode('.', trim($bits[7], '.'));
                            $tags = $tags[0] === '' ? [] : $tags;
                            $additionalArtists = $additionalArtists[0] === '' ? [] : $additionalArtists;
                            for ($k = 0; $k < count($tags); $k++) $tags[$k] = (int)$tags[$k];
                            for ($k = 0; $k < count($additionalArtists); $k++) $additionalArtists[$k] = (int)$additionalArtists[$k];
                            $library['songs'][(int)$bits[0]] = [
                                'id' => (int)$bits[0],
                                'name' => $bits[1],
                                'artist' => (int)$bits[2],
                                'bytes' => (int)$bits[3],
                                'seconds' => (int)$bits[4],
                                'tags' => $tags,
                                'platform' => (int)$bits[6],
                                'additionalArtists' => $additionalArtists,
                                'link' => $bits[8],
                                'new' => (bool)$bits[9],
                                'priority' => (int)$bits[10],
                                'number' => (int)$bits[11],
                            ];
                            break;
                        case 3: // Tag
                            $library['tags'][(int)$bits[0]] = $bits[1];
                            break;
                    }
                }
            }
            $library['version'] = (int)$data[0];

            $disk->put($path . 'musiclibrary_02_' . $library['version'] . '.dat', $res);
            $disk->put($path . 'musiclibrary_02_' . $library['version'] . '.json', json_encode($library, JSON_INVALID_UTF8_IGNORE));
        } else {
            $library = json_decode($library, true);
        }

        // TODO: db-back songs so they can appear in embed metadata
        return page('Tools/Music', [
            'library' => config('app.storage_url') . $path . 'musiclibrary_02_' . $library['version']
        ])->meta('Music Library', 'Browse the official Geometry Dash music library on the unofficial Geometry Dash music library browser! Unofficially!')
            ->breadcrumbs([
                crumb('Tools', '')
            ]);
    }
}
