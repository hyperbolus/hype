<?php

namespace App;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Security {
    const TOR_BLOCKLIST_PATH = 'torlist.txt';
    const DENY_ON_FAIL = true;

    public static function updateTorBlockList(): void
    {
        try {
            $res = Http::get(config('security.tor_blocklist'));

            if ($res->status() !== 200) return;

            Storage::put(self::TOR_BLOCKLIST_PATH, $res->body());
        } catch (Exception $e) {
            return;
        }
    }

    public static function isTor(string $ip): bool
    {
        if (!$list = Storage::get(self::TOR_BLOCKLIST_PATH)) {
            self::updateTorBlockList();
            if (!$list = Storage::get(self::TOR_BLOCKLIST_PATH)) return self::DENY_ON_FAIL;
        }

        return Str::contains($list, $ip);
    }

    public static function isProxy(string $ip): bool
    {
        if (self::isTor($ip)) return true;

        try {
            $res = Http::get(config('services.ipapi_is.endpoint') . '/?key=' . config('services.ipapi_is.key') . '&q=' . $ip);

            if ($res->status() !== 200) return self::DENY_ON_FAIL;

            $res = $res->json();

            return $res['is_proxy'] || $res['is_vpn'] || $res['is_tor'];
        } catch (Exception $e) {
            return self::DENY_ON_FAIL;
        }
    }
}
