<?php
if (! function_exists('meta')) {
    function meta(string $title = null, string $description = null): array
    {
        return [
            '__meta_title' => $title,
            '__meta_description' => $description,
        ];
    }
}

if (! function_exists('page')) {
    function page(string $component, array $props = [])
    {
        return new \App\PageBuilder($component, $props);
    }
}

if (! function_exists('crumb')) {
    function crumb(string $text, ?string $url = null): array
    {
        return ['text' => $text, 'url' => $url];
    }
}

if (! function_exists('xor_key')) {
    function xor_key(string $str, string $key)
    {
        $out = '';

        for ($i = 0; $i < strlen($str);) {
            for ($j = 0; ($j < strlen($key) && $i < strlen($str)); $j++, $i++) {
                $out .= $str[$i] ^ $key[$j];
            }
        }

        return $out;
    }
}

if (! function_exists('gj_unmap')) {
    function gj_unmap($dict, $separator)
    {
        $string = '';
        foreach ($dict as $key => $value) {
            $string .= "${separator}${key}${separator}${value}";
        }
        return $string;
    }
}

if (! function_exists('gj_map')) {
    function gj_map($list, $separator)
    {
        $bits = explode($separator, $list);
        $array = [];
        for ($i = 1; $i < count($bits); $i += 2) {
            $array[$bits[$i - 1]] = $bits[$i];
        }
        return $array;
    }
}

if (! function_exists('base64_urlencode')) {
    function base64_urlencode($string)
    {
        return base64_encode(strtr($string, '+/', '-_'));
    }
}

if (! function_exists('base64_urldecode')) {
    function base64_urldecode($string)
    {
        return base64_decode(strtr($string, '-_', '+/'), true);
    }
}
