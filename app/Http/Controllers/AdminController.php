<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Yggdrasil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Mr. admin actions
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function __invoke(Request $request)
    {
        switch ($request->input('action')) {
            case 'approve dev':
                User::find($request->input('user_id'))->assignRole('dev');
                break;
        }

        return $request->wantsJson()
            ? new JsonResponse('', 200)
            : back()->with('status', 'admin-action-completed');
    }
}
