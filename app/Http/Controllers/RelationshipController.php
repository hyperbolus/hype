<?php

namespace App\Http\Controllers;

use App\Enums\RelationshipType;
use App\Models\Relationship;
use App\Models\System\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RelationshipController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'user_id' => ['required', Rule::exists('users', 'id'), Rule::notIn([$request->user()->id])],
        ]);

        Relationship::query()->upsert([
            'from_id' => $request->user()->id,
            'to_id' => $request->integer('user_id'),
            'type' => RelationshipType::Block
        ], ['from_id', 'to_id', 'type'], ['from_id', 'to_id', 'type']);

        return back();
    }

    public function update(Request $request, Relationship $relationship)
    {
        //
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) abort(403);

        Relationship::query()
            ->where('type', RelationshipType::Block)
            ->where('from_id', $request->user()->id)
            ->where('to_id', $user->id)
            ->delete();

        return back();
    }
}
