<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\Ban;
use Illuminate\Contracts\Support\Responsable;

class BanController extends Controller
{
    public function index(): Responsable
    {
        return page('Bans/Index', [
            'bans' => sorting(Ban::class)->with(['bannable', 'creator'])->paginate(),
            'sorting' => sorting(Ban::class),
        ])->meta('Bans', 'View banned users');
    }
}
