<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Content\Playlist;
use App\Models\Content\Post;
use App\Models\Content\Review;
use App\Models\Content\Video;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): Responsable
    {
        return page('Users/Index', [
            'users' => sorting(User::profile()->withCount('reviews'))
                ->where('created_at', '<', now()->subDay())
                ->paginatorOptions(18, 1, 18 * 2)
                ->paginate(),
            'sorting' => sorting(User::class),
        ])->meta('Member List', 'Browse the list of registered Hyperbolus users');
    }

    public function show(User $user): Responsable
    {
        // TODO: add all ratings and condense into single query
        $counts = $user->reviews()
            ->selectRaw('rating_overall, COUNT(*) as count')
            ->groupBy('rating_overall')
            ->get()
            ->keyBy('rating_overall')
            ->map(fn(Review $review) => $review->count);

        $curve = [
            0 => $counts[0] ?? 0,
            1 => $counts[1] ?? 0,
            2 => $counts[2] ?? 0,
            3 => $counts[3] ?? 0,
            4 => $counts[4] ?? 0,
            5 => $counts[5] ?? 0,
            6 => $counts[6] ?? 0,
            7 => $counts[7] ?? 0,
            8 => $counts[8] ?? 0,
            9 => $counts[9] ?? 0,
            10 => $counts[10] ?? 0,
        ];

        // TODO: appends
        return page('Users/Show', [
            'profile' => $user->withBlocks()->loadCount(['threads', 'posts', 'reviews', 'names']),
            'comments' => $user->comments()->latest()->paginate(10, ['*'], 'comments'),
            'reviews' => Review::withReview()
                ->latest()
                ->where('user_id', $user->id)
                ->with('level')
                ->paginate(5, ['*'], 'reviews'),
            'curve' => $curve
        ])->meta($user->name, $user->bio ?? 'This user has no bio.')
            ->breadcrumbs([
                crumb('Users', route('users.index'))
            ]);
    }

    public function reviews(Request $request, User $user): Responsable
    {
        // TODO: add all ratings and condense into single query
        $counts = $user->reviews()
            ->selectRaw('rating_overall, COUNT(*) as count')
            ->groupBy('rating_overall')
            ->get()
            ->keyBy('rating_overall')
            ->map(fn(Review $review) => $review->count);

        $curve = [
            0 => $counts[0] ?? 0,
            1 => $counts[1] ?? 0,
            2 => $counts[2] ?? 0,
            3 => $counts[3] ?? 0,
            4 => $counts[4] ?? 0,
            5 => $counts[5] ?? 0,
            6 => $counts[6] ?? 0,
            7 => $counts[7] ?? 0,
            8 => $counts[8] ?? 0,
            9 => $counts[9] ?? 0,
            10 => $counts[10] ?? 0,
        ];

        $reviews = Review::query()->where('user_id', $user->id);

        $ranges = [
            'difficulty' => (string) $request->string('difficulty', '0-100'),
            'overall' => (string) $request->string('overall', '0-10'),
            'visuals' => (string) $request->string('visuals', '0-10'),
            'gameplay' => (string) $request->string('gameplay', '0-10'),
        ];

        if ($ranges['difficulty'] == '0-100') unset($ranges['difficulty']);
        if ($ranges['overall'] == '0-10') unset($ranges['overall']);
        if ($ranges['visuals'] == '0-10') unset($ranges['visuals']);
        if ($ranges['gameplay'] == '0-10') unset($ranges['gameplay']);

        foreach ($ranges as $key => $range) {
            $reviews->whereBetween('rating_' . $key, clampRange($range, 0, $key === 'difficulty' ? 100 : 10));
        }

        return page('Users/Sections/Reviews', [
            'profile' => $user->withBlocks()->loadCount(['threads', 'posts', 'reviews']),
            'reviews' => sorting($reviews)->latest()
                ->filters()
                ->with('level')
                ->append($ranges)
                ->paginatorOptions(10, 1, 30)
                ->paginate(),
            'curve' => $curve,
            'sorting' => sorting(Review::class)->filters()->append($ranges)
        ])->meta('Reviews', $user->name . '\'s Level Reviews')
            ->breadcrumbs([
                crumb('Users', route('users.index')),
                crumb($user->name, route('users.show', $user->id)),
            ]);
    }

    public function videos(User $user): Responsable
    {
        $videos = sorting(Video::query())
            ->where('user_id', $user->id)
            ->paginatorOptions(12, 1, 30);
        $paginate = $videos->paginate();

        return page('Users/Sections/Videos', [
            'profile' => $user->withBlocks()->loadCount(['threads', 'posts', 'reviews']),
            'videos' => $paginate,
            'sorting' => $videos
        ])->meta('Videos', $user->name . ' has added ' . $paginate->total() . ' to the site')
            ->breadcrumbs([
                crumb('Users', route('users.index')),
                crumb($user->name, route('users.show', $user->id)),
            ]);
    }

    public function playlists(User $user): Responsable
    {
        $playlists = sorting(Playlist::class)
            ->where('owner_id', $user->id)
            ->where('visibility', 'public')
            ->paginate(10);

        return page('Users/Sections/Playlists', [
            'profile' => $user->withBlocks()->loadCount(['threads', 'posts', 'reviews']),
            'playlists' => $playlists,
            'sorting' => sorting(Playlist::class)
        ])->meta('Playlists', $user->name . ' has ' . $playlists->total() . ' playlists')
            ->breadcrumbs([
                crumb('Users', route('users.index')),
                crumb($user->name, route('users.show', $user->id)),
            ]);
    }

    public function posts(User $user): Responsable
    {
        $posts = sorting(Post::class)
            ->where('author_id', $user->id)
            ->with(['author', 'thread'])
            ->paginate(10);

        return page('Users/Sections/Posts', [
            'profile' => $user->withBlocks()->loadCount(['threads', 'posts', 'reviews']),
            'posts' => $posts,
            'sorting' => sorting(Post::class)
        ])->meta('Posts', $user->name . ' has ' . $posts->total() . ' posts')
            ->breadcrumbs([
                crumb('Users', route('users.index')),
                crumb($user->name, route('users.show', $user->id)),
            ]);
    }
}
