<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
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
