<?php

namespace App;

use App\Dashboards\Dashboard;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class PageBuilder implements Responsable
{
    protected string $component = '';

    protected ?string $title = 'Hyperbolus';

    protected ?string $description = 'Your source for everything Geometry Dash';

    protected array $props = [];
    protected array $breadcrumbs = [];
    protected bool $titleBreadcrumb = true;

    public function __construct(string $component, array $props = []) {
        $this->component = $component;
        $this->props = $props;
        return $this;
    }

    public function meta(string $title, ?string $description = null, bool $breadcrumb = true): PageBuilder {
        $this->title = $title;
        $this->description = $description;
        $this->titleBreadcrumb = $breadcrumb;
        return $this;
    }

    public function title(string $title): PageBuilder {
        $this->title = $title;
        return $this;
    }

    public function description(string $description): PageBuilder {
        $this->description = $description;
        return $this;
    }

    public function breadcrumbs(array $breadcrumbs): PageBuilder {
        $this->breadcrumbs = $breadcrumbs;
        return $this;
    }

    /**
     * @param class-string $dashboard
     * @return $this
     */
    public function dashboard(string $dashboard): PageBuilder {
        if (!(new $dashboard() instanceof Dashboard)) return $this;

        return $this;
    }

    public function toResponse($request): JsonResponse|Response
    {
        $this->breadcrumbs = array_filter($this->breadcrumbs, fn ($crumb) => $crumb['show']);

        if ($this->title && $this->titleBreadcrumb) $this->breadcrumbs[] = crumb($this->title, $request->fullUrl());

        return Inertia::render($this->component, [
            ...$this->props,
            '__meta_title' => $this->title,
            '__meta_description' => $this->description,
            '__meta_breadcrumbs' => $this->breadcrumbs
        ])->toResponse($request);
    }
}
