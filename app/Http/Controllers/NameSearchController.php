<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class NameSearchController extends Controller
{
    public function __invoke(Request $request): Collection
    {
        return DB::table('users')->select(['id', 'name'])->where('name', 'LIKE', '%' . \request('name') . '%')->get();
    }
}
