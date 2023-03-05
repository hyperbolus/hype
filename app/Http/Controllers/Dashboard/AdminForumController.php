<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Content\Forum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminForumController extends Controller
{
    /**
     * Mr. admin actions
     */
    public function __invoke(Request $request): RedirectResponse
    {
        switch ($request->string('action')) {
            case 'create':
                $forum = new Forum();
                $forum->name = request('name');
                $forum->description = request('description');
                if (request('use_slug')) {
                    if (! empty(request('slug'))) {
                        $forum->slug = request('slug');
                    }
                } else {
                    $forum->slug = null;
                }
                $forum->redirect = request('redirect');
                $forum->parent_id = request('parent_id');
                $forum->category = request('category');
                $forum->visible = request('visible');
                $forum->priority = request('priority');
                $forum->password = request('password');
                $forum->save();
                break;
            case 'delete':
                //
                break;
        }

        return back();
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Forums', [
            'forums' => Forum::query()->paginate(25),
        ]);
    }
}
