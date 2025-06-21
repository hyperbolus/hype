<?php

namespace App\Http\Controllers\Moderation;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use App\Models\System\Report;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;

class ModerationDashboardController extends Controller
{
    public function index(Request $request): Responsable
    {
        $search = [
            'model' => $request->integer('model',  1),
            'status' => (string)$request->string('status',  'all'),
            'reasons' => $request->array('reasons'),
        ];

        $reports = Report::query()
            ->latest()
            ->with(['reporter', 'reportable'])
            ->where('reportable_type', $search['model']);

        if (count($search['reasons']) > 0) $reports->whereIn('reason_id', $search['reasons']);
        if ($search['status'] !== 'all') {
            if ($search['status'] === 'open') $reports->whereNull('closed_at');
            if ($search['status'] === 'closed') $reports->whereNotNull('closed_at');
        }

        return page('Moderation/Dashboard', [
            'reports' => $reports->paginate(10),
            'search' => $search
        ])->meta('Reports', 'View list of content reported by users');
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
