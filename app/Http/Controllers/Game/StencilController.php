<?php

namespace App\Http\Controllers\Game;

use App\Http\Controllers\Controller;
use App\Models\Content\Stencil;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;

class StencilController extends Controller
{
    public function index(): Responsable
    {
        return page('Stencils/Index', [
            'stencils' => Stencil::query()->whereNotNull('id')->paginate()
        ])->meta('Stencils', 'Share custom creations for others to use!');
    }

    public function create(): Responsable
    {
        return page('Stencils/Create')
            ->meta('New Stencil', 'Share a new stencil')
            ->breadcrumbs([
                crumb('Stencils', route('stencils.index'))
            ]);
    }

    public function interstitial(): Responsable
    {
        return page('Stencils/Interstitial')
            ->meta('New Stencil', 'Share a new stencil')
            ->breadcrumbs([
                crumb('Stencils', route('stencils.index'))
            ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $attributes = $request->validate([
            'name' => ['required', 'max:32'],
            'description' => ['required'],
            'object_string' => ['required']
        ]);

        $stencil = Stencil::create([
            ...$attributes,
            'format' => 'obj[;]',
            'author_id' => $request->user()->id,
        ]);

        return redirect()->route('stencils.show', $stencil->id);
    }

    public function show(Stencil $stencil): Responsable
    {
        return page('Stencils/Show', [
            'stencil' => $stencil
        ])->meta($stencil->name, $stencil->description)
            ->breadcrumbs([
                crumb('Stencils', route('stencils.index'))
            ]);
    }

    public function edit(Stencil $stencil)
    {
        //
    }

    public function update(Request $request, Stencil $stencil)
    {
        //
    }

    public function destroy(Stencil $stencil)
    {
        //
    }
}
