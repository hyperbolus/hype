<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home()
    {
        return Inertia::render('Home', [
            'users' => DB::table('users')->count(),
            'levels' => DB::table('levels')->count(),
            'reviews' => DB::table('reviews')->count(),
            'videos' => DB::table('videos')->count(),
        ]);
    }

    public function forums()
    {
        return Inertia::render('Forums');
    }

    public function levels()
    {
        return Inertia::render('Levels');
    }
}
