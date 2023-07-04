<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index() {

    }

    public function show(Request $request, string $id) {
        $user = $request->user();
        $notification = $user->notifications()->where('id', $id)->first();

        if (!$notification) {
            abort(404);
        }

        $notification->markAsRead();

        return redirect()->to($notification->data['link']);
    }

    public function update(Request $request) {
        $user = $request->user();
        /**
         * @type User $user
         */
        // TODO: Collection, make it update raw in DB rather than fetch first
        $user->notifications->markAsRead();

        return back();
    }
}
