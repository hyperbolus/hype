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

class HomeController extends Controller
{
    public function home()
    {
        $fpa = Setting::query()->where('key', '=', 'frontpage_article')->first();

        if ($fpa) {
            $q = Article::query()->find($fpa);
        } else {
            $q = Article::query()->latest()->first();
        }

        return page('Home', [
            'frontpage_article' => $q,
            'recent_articles' => Article::query()
                ->latest()
                ->whereNot('id', '=', $q->id ?? 0)
                ->limit(2)
                ->get(),
            'recent_posts' => Post::query()
                ->latest()
                ->with(['author', 'thread', 'thread.author'])
                ->limit(5)
                ->get(),
            'recent_reviews' => Review::query()
                ->latest()
                ->with(['author', 'level'])
                ->limit(5)
                ->get(),
            'recent_videos' => Video::query()
                ->latest()
                ->limit(6)
                ->get(),
            'newest_user' => User::query()->latest()->first()
        ])->meta('Home', 'Hyperbolus, your home for Geometry Dash');
    }

    public function news(): Responsable
    {
        return page('News', [
            'frontpage_article' => [],
        ])->meta('News', 'The latest news in the Geometry Dash community');
    }

    public function client(): Response
    {
        return Inertia::render('Client');
    }

    public function forge(): Response
    {
        return Inertia::render('Forge');
    }

    public function about(): Responsable
    {
        return page('About')
            ->meta('About Hyperbolus', 'Read all about our coooool fucking backstory');
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
