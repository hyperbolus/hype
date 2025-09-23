<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\RelationshipType;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\Rule;

class DashboardRelationshipController extends Controller
{
    public function show(Request $request): Responsable
    {
        $request->validate([
            'type' => ['nullable', Rule::in(['friends', 'enemies', 'blocked', 'muted'])],
            'filter' => ['nullable', Rule::in(['pending', 'all', 'online'])]
        ]);

        $map = [
            'friends' => RelationshipType::Friend,
            'enemies' => RelationshipType::Enemy,
            'blocked' => RelationshipType::Block,
            'muted' => RelationshipType::Mute,
        ];

        $type = (string) $request->string('type', 'blocked');
        $filter = (string) $request->string('type', 'all');

        $sent = [];
        $received = [];

        if ($map[$type] === RelationshipType::Block) {
            $sent = $request->user()->blockedUsers;
        }

        return page('Dashboard/Relationships', [
            'sent' => $sent,
            'received' => $received,
        ])->meta('', '');
    }
}
