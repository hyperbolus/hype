<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Home');
    }

    public function client(): Response
    {
        return Inertia::render('Client');
    }

    public function forge(): Response
    {
        return Inertia::render('Forge');
    }

    public function levels(): Response
    {
        return Inertia::render('Levels');
    }
}
