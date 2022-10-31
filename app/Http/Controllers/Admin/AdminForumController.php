<?php

namespace App\Http\Controllers\Admin;

use App\Models\Forum;
use App\Models\User;
use App\Notifications\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;
use function redirect;

class AdminForumController extends Controller
{
    /**
     * Mr. admin actions
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function __invoke(Request $request)
    {
        switch ($request->action) {
            case 'create':
                $forum = new Forum();
                $forum->name = request('name');
                $forum->description = request('description');
                if (request('use_slug')) {
                    if (!empty(request('slug'))) {
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
        }

        return redirect()->back();
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Forums', [
            'forums' => Forum::paginate(25)
        ]);
    }
}
