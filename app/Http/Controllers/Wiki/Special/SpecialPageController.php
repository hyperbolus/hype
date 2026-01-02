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

    public function all_pages(Request $request)
    {
        return page('Wiki/Page/Index', [
            'pages' => WikiPage::query()->latest()->paginate(),
        ])->meta('All Pages', 'List of all wiki pages');
    }
}
