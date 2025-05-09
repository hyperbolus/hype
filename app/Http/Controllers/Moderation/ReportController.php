<?php

namespace App\Http\Controllers\Moderation;

use App\Http\Controllers\Controller;
use App\Models\Content\Post;
use App\Models\Content\Review;
use App\Models\System\ProfileComment;
use App\Models\System\Report;
use App\Models\System\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReportController extends Controller
{
    public function index(Request $request): Responsable
    {
        $search = [
            'model' => $request->integer('model',  1),
            'status' => (string)$request->string('status',  'all'),
            'reasons' => $request->array('reasons'),
        ];

        $reports = Report::query()
            ->latest()
            ->with(['reporter', 'reportable'])
            ->where('reportable_type', $search['model']);

        if (count($search['reasons']) > 0) $reports->whereIn('reason_id', $search['reasons']);
        if ($search['status'] !== 'all') {
            if ($search['status'] === 'open') $reports->whereNull('closed_at');
            if ($search['status'] === 'closed') $reports->whereNotNull('closed_at');
        }

        return page('Moderation/Reports/Index', [
            'reports' => $reports->paginate(10),
            'search' => $search
        ])->meta('Reports', 'View list of content reported by users');
    }

    public function create(Request $request): Responsable
    {
        return page('Reports/Create', [
            'type' => $request->type ?? null,
            'id' => $request->type ?? null,
        ])->meta('Report Content', 'Report something that violates the rules');
    }

    public function store(Request $request): RedirectResponse
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
            'url' => 'required',
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
        $report->url = $request->string('url');
        $report->reason_id = $request->integer('reason_id');
        $report->reportable_type = $request->integer('reportable_type');
        $report->reportable_id = $request->integer('reportable_id');
        $report->reporter_id = auth()->id();
        $report->save();

        return back();
    }

    public function show(Request $request, Report $report): Responsable
    {
        $reportables = [
            User::class,
            Post::class,
            Review::class,
            ProfileComment::class
        ];

        $input = $request->validate([
            'type' => [Rule::in(['user', 'post', 'profilecomment', 'review'])]
        ]);

        return page('Moderation/Reports/Show', [
            'report' => $report->load(['reporter', 'reportable'])
        ])->meta('Show Report', 'View reported content')
            ->breadcrumbs([
                crumb('Reports', route('moderation.reports.index'))
            ]);
    }

    public function update(Request $request, Report $report)
    {
        $request->validate([
            ''
        ]);

        //if ($request->get('closed_at')) $report->

        return back();
    }

    public function destroy(Report $report)
    {
        //
    }
}
