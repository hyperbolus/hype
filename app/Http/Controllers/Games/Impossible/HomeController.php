<?php

namespace App\Http\Controllers\Games\Impossible;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Impossible/Home');
    }

    public function levels(): Response
    {
        return Inertia::render('Impossible/Levels');
    }
}
