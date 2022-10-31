<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Setup;
use App\Models\User;
use App\Notifications\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use function redirect;

class AdminSetupController extends Controller
{
    public function show(): RedirectResponse
    {
        Auth::loginUsingId(1, true);

        return redirect()->route('system.home');
    }
}
