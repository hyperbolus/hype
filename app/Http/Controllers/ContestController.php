<?php

namespace App\Http\Controllers;

use App\Models\Content\Contest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contests/Index', [
            'contests' => Contest::all()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Contests/Create');
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Contest $contest): Response
    {
        return Inertia::render('Contests/Show', [
            'contest' => $contest
        ]);
    }

    public function edit(Contest $contest)
    {
        //
    }

    public function update(Request $request, Contest $contest)
    {
        //
    }

    public function destroy(Contest $contest)
    {
        //
    }
}
