<?php

namespace App\Http\Controllers\Dashboard;

use App\Actions\CalculateRatings;
use App\Actions\MacroMetadata;
use App\Models\System\User;
use App\Notifications\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Notification;

class AdminController extends Controller
{
    /**
     * Mr. admin actions
     */
    public function __invoke(Request $request): RedirectResponse
    {
        switch ($request->string('action')) {
            case 'send announcement':
                $users = User::all();
                Notification::send($users, new Announcement($request->string('message'), $request->string('link')));
                break;
            case 'recalculate ratings':
                CalculateRatings::all();
                break;
            case 'update macros':
                MacroMetadata::all();
                break;
        }
        return back();
    }

    public function show(): Response
    {
        return Inertia::render('Admin/Home');
    }
}
