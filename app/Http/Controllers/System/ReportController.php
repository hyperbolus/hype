<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Models\System\Report;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Reports/Index', [
            'reports' => Report::query()->latest()->with('reporter')->paginate(10),
        ]);
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
            'reportable_type' => [
                'required',
                function (string $attribute, mixed $value, \Closure $fail) {
                    if (!array_key_exists($value, config('hyperbolus.morph_map'))) {
                        $fail("The {$attribute} is invalid.");
                    }
                }
            ],
        ]);

        $request->validate([
            'subject' => 'required',
            'details' => 'required',
            'reason_id' => [
                function (string $attribute, mixed $value, \Closure $fail) {
                    if (!array_key_exists($value, config('hyperbolus.report_reasons'))) {
                        $fail("The {$attribute} is invalid.");
                    }
                }
            ],
            'reportable_id' => [
                Rule::exists(config('hyperbolus.morph_map')[$request->integer('reportable_type')], 'id')
            ]
        ]);

        $report = new Report();
        $report->subject = $request->string('subject');
        $report->content = $request->string('details');
        $report->reason_id = $request->integer('reason_id');
        $report->reportable_type = $request->integer('reportable_type');
        $report->reportable_id = $request->integer('reportable_id');
        $report->reporter_id = auth()->id();
        $report->save();

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
