<?php

namespace App\Http\Controllers\Games\Soundodger;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Soundodger/Home');
    }

    public function levels(): Response
    {
        return Inertia::render('Soundodger/Levels');
    }
}
