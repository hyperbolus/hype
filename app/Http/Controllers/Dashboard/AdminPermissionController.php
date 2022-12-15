<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\System\User;
use App\Notifications\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;

class AdminPermissionController extends Controller
{
    /**
     * Mr. admin actions
     */
    public function __invoke(Request $request): RedirectResponse
    {
        /**
         * @var User $user
         */
        $user = User::query()->find($request->integer('user_id'));
        switch ($request->string('action')) {
            case 'approve dev':
                $user->assignRole('dev');
                break;
            case 'send announcement':
                $users = User::all();
                Notification::send($users, new Announcement($request->string('message'), $request->string('link')));
                break;
        }

        return back();
    }

    public function show(): Response
    {
        return Inertia::render('Admin');
    }
}
