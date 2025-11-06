<?php

namespace App\Http\Controllers\Dashboards\Moderation;

use App\Dashboards\ModerationDashboard;
use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\System\Report;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;

class ModerationController extends Controller
{
    public function index(Request $request): Responsable
    {
        return ModerationDashboard::page('moderation.home', [
            'open_reports_count' => Report::query()->whereNull('closed_at')->count(),
            'users_count' => User::query()->count(),
        ]);
    }

    public function ban(Request $request)
    {
        $request->validate([
            'reason' => ['required'],
            'user_id' => ['required'],
        ]);

        $user = User::query()->where('id', $request->integer('user_id'))->first();
        if (!$user) abort(404);
        $user->banned_at = now();
        $user->save();

        $ban = new Ban();
        $ban->bannable_id = $user->id;
        $ban->bannable_type = 1;
        $ban->created_by_id = $request->user()->id;
        $ban->created_by_type = 1;
        $ban->comment = $request->string('reason');
        if ($request->has('expired_at')) $ban->expired_at = $request->string('expired_at');
        $ban->save();

        return back();
    }
}
