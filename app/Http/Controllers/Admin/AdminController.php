<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Mr. admin actions
     */
    public function __invoke(Request $request): RedirectResponse
    {
        return back();
    }

    public function show(): Response
    {
        return Inertia::render('Admin/Home');
    }
}
