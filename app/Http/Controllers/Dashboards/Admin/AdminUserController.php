<?php

namespace App\Http\Controllers\Dashboards\Admin;

use App\Dashboards\AdminDashboard;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use function redirect;

class AdminUserController extends Controller
{
    /**
     * Mr. admin actions
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $response = redirect()->back();

        switch ($request->string('action')) {
            case 'impersonate':
                $request->user()->impersonate(User::query()->find(request('user')));
                $response = redirect()->route('home');
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

        return $response;
    }

    public function show(): Responsable
    {
        return AdminDashboard::page('system.users', [
            'users' => User::query()->paginate(20),
        ]);
    }
}
