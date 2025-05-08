<?php

namespace App\Http\Controllers\Admin;

use App\Models\System\Setting;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use function redirect;

class AdminSettingController extends Controller
{
    /**
     * Mr. admin actions
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $response = redirect()->back();
        switch ($request->string('action')) {
            case 'update':
                $request->user()->impersonate(User::query()->find(request('user')));
                $response = redirect()->route('home');
                break;
            case 'create':
                $setting = new Setting();
                $setting->site = $request->integer('site');
                $setting->key = $request->string('key');
                $setting->value = $request->string('value');
                $setting->type = $request->integer('type');
                $setting->save();
                break;
        }

        return $response;
    }

    public function show(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settings' => Setting::query()->paginate(20),
        ]);
    }
}
