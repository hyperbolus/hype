<?php

namespace App\Http\Controllers\Admin;

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

class AdminController extends Controller
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
            case 'approve dev':
                User::find($request->user_id)->assignRole('dev');
                break;
            case 'send announcement':
                $users = User::all();
                Notification::send($users, new Announcement($request->message, $request->link));
                break;
        }

        return redirect()->back();
    }

    public function show(): Response
    {
        return Inertia::render('Admin/Home');
    }
}
