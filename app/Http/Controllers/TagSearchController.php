<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class TagSearchController extends Controller
{
    public function __invoke(Request $request): Collection
    {
        return DB::table('level_tags')->select(['id', 'name'])->where('name', 'LIKE', '%' . \request('name') . '%')->get();
    }
}
