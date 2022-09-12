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
        return Inertia::render('Home');
    }

    public function client()
    {
        return Inertia::render('Client');
    }

    public function forge()
    {
        return Inertia::render('Forge');
    }

    public function levels()
    {
        return Inertia::render('Levels');
    }
}
