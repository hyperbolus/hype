<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function client(): Response
    {
        return Inertia::render('Client');
    }

    public function forge(): Response
    {
        return Inertia::render('Forge');
    }

    public function levels(): Response
    {
        $featured = Cache::get('levels.featured');
        if (!$featured) {
            $featured = Http::get('https://gdbrowser.com/api/search/gdforums?type=featured')->json();
            Cache::put(json_encode($featured), 3600);
        } else {
            $featured = json_decode($featured);
        }

        $magic = Cache::get('levels.magic');
        if (!$magic) {
            $magic = Http::get('https://gdbrowser.com/api/search/gdforums?type=magic')->json();
            Cache::put(json_encode($magic), 3600);
        } else {
            $magic = json_decode($magic);
        }

        return Inertia::render('Levels', [
            'featured' => $featured,
            'magic' => $magic
        ]);
    }
}
