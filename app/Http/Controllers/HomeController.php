<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Content\Review;
use App\Models\Content\Thread;
use App\Models\Content\Video;
use App\Models\Game\Level;
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

//        $dcr = Http::asForm()->withUserAgent('')
//            ->post('https://www.boomlings.com/database/getGJComments21.php', [
//                'levelID' => '60805571',
//                'page' => '0',
//                'secret' => 'Wmfd2893gb7'
//            ])->body();
//
//        $dcr = explode('#', $dcr)[0];
//        $dcr = explode('|', $dcr);
//
//        foreach ($dcr as &$d) {
//            $bits = explode(':', $d);
//            $d = gj_map($bits[0], '~');
//            sort($d);
//            $d[6] = base64_urldecode($d[6]);
//            $d[7] = gj_map($bits[1], '~');
//            //$d[7] = $bits[1];
//        }

        return page('Home', [
            'frontpage_article' => $q,
            'recent_articles' => Article::query()
                ->latest()
                ->whereNot('id', '=', $q->id ?? 0)
                ->limit(2)
                ->get(),
            'recent_posts' => Thread::query()
                ->latest('last_activity_at')
                ->whereHas('lastPost')
                ->with(['author', 'lastPost', 'lastPost.author'])
                ->limit(5)
                ->get(),
            'recent_reviews' => Review::query()
                ->latest()
                ->with(['author', 'level'])
                ->whereNot('review', '')
                ->limit(5)
                ->get(),
            'recent_videos' => Video::query()
                ->latest()
                ->limit(6)
                ->get(),
            'newest_user' => User::query()->latest()->first(),
            'online' => User::query()->latest('last_seen')->where('last_seen', '>', now()->subMinutes(30))->get()
            //'daily_chat' => $dcr
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

    public function contact(): Responsable
    {
        return page('Contact')
            ->meta('Contact Us', 'Talk to the site staff');
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
            'magic' => $magic,
            'levels' => Level::query()
                ->orderBy('reviews_count', 'DESC')
                ->orderBy('id')
                ->withCount('reviews')
                ->paginate(10)
        ]);
    }
}
