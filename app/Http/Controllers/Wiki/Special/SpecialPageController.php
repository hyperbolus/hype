<?php


namespace App\Http\Controllers\Wiki\Special;

use App\Http\Controllers\Controller;
use App\Models\WikiPage;
use App\Wiki;
use Illuminate\Http\Request;

class SpecialPageController extends Controller
{
    public function random(Request $request)
    {
        $page = WikiPage::query()
            ->where('lang', Wiki::$languages[$request->string('lang', Wiki::$defaultLang)->toString()])
            ->inRandomOrder()
            ->firstOrFail();

        return redirect($page->getURL());
    }
}
