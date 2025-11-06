<?php

namespace App\Http\Controllers\Dashboards\Admin;

use App\Dashboards\AdminDashboard;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Routing\Controller;

class AdminHomeController extends Controller
{
    public function show(): Responsable
    {
        return AdminDashboard::page('system.home');
    }
}
