<?php

namespace App\Http\Controllers\Dashboards\Moderation;

use App\Dashboards\ModerationDashboard;
use App\Http\Controllers\Controller;
use App\Models\IP;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;

class ModerationIPController extends Controller
{
    public function index(Request $request): Responsable
    {
        $query = sorting(IP::query())->with(['user']);

        if ($request->integer('user', null)) $query->where('user_id', $request->integer('user'));
        if ($request->string('type', 'all') == '4') $query->whereLike('address', '%.%');
        if ($request->string('type', 'all') == '6') $query->whereLike('address', '%:%');
        if ($request->filled('address')) $query->whereLike('address', $request->string('address')->replace('*', '%'));

        return ModerationDashboard::page('moderation.ip.index', [
            'user_id' => $request->filled('user') ? $request->integer('user') : null,
            'type' => $request->string('type', 'all'),
            'address' => $request->string('address'),

            'ips' => $query->paginate(),
            'sorting' => sorting(IP::class),
        ]);
    }
}
