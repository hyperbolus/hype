<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Notifications\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Inertia\Response;
use function redirect;

class AdminUserController extends Controller
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
            case 'impersonate':
                $request->user()->impersonate(User::find(request('user')));
                return redirect()->route('home');
                break;
            case 'create':
                $user = new User();
                if (request('user_id')) {
                    $user->id = request('user_id');
                }
                $user->name = request('username');
                $user->email = request('email');
                $user->password = Hash::make(request('password'));
                $user->referrer_id = request('referrer');
                $user->save();
                break;
        }

        return redirect()->back();
    }

    public function show(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::paginate(20)
        ]);
    }
}
