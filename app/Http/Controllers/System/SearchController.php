<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Content\Tag;
use App\Models\System\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Search', [
            'filters' => [
                'searchType' => 0,
                'sortBy' => 0,
                'sortDir' => 0,
            ],
        ]);
    }

    public function username(Request $request): Collection
    {
        $except = (int) \request('except') ?? null;

        return User::query()->select(['id', 'name'])->where('name', 'LIKE', '%'.\request('name').'%')->whereNot('id', '=', $except)->get();
    }

    public function tagname(Request $request): Collection
    {
        return Tag::query()->select(['id', 'name'])->where('name', 'LIKE', '%'.\request('name').'%')->get();
    }
}
