<?php

namespace App\Http\Controllers;

use App\Models\System\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index()
    {
        //
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Reports/Create', [
            'type' => $request->type ?? null,
            'id' => $request->type ?? null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required',
            'body' => 'required',
        ]);

        $report = new Report();

        //$report->save();

        return back();
    }

    public function show(Report $report)
    {
        //
    }

    public function edit(Report $report)
    {
        //
    }

    public function update(Request $request, Report $report)
    {
        //
    }

    public function destroy(Report $report)
    {
        //
    }
}
