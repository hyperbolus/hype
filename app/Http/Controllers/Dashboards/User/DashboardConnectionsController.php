<?php

namespace App\Http\Controllers\Dashboards\User;

use App\Dashboards\UserDashboard;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class DashboardConnectionsController extends Controller
{
    public function show(Request $request): Responsable
    {
        return UserDashboard::page('settings.connections', [
            'accounts' => $request->user()->linkedAccounts->keyBy('platform'),
        ]);
    }
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'action' => 'required'
        ]);

        /**
         * @type User $user
         */
        $user = auth()->user();
        switch ($request->string('action')) {
            case 'generate code':
                $request->validate([
                    'username' => 'required'
                ]);

                Cache::put('gd:link:' . $request->user()->id . ',' . $request->string('username'), '');
                break;
            case 'check messages':
                $request->validate([
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'current_password',
                ]);
                $user->email = $request->input('email');
                $user->save();

                break;

        }

        return back();
    }
}
