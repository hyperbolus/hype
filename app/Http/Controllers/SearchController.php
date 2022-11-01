<?php

namespace App\Http\Controllers;

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
            ]
        ]);
    }
}
