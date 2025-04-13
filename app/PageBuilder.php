<?php

namespace App;

use Illuminate\Contracts\Support\Responsable;
use Inertia\Inertia;

class PageBuilder implements Responsable
{
    protected string $component = '';

    protected ?string $title = 'Hyperbolus';

    protected ?string $description = 'Your source for everything Geometry Dash';

    protected array $props = [];
    protected array $breadcrumbs = [];

    public function __construct(string $component, array $props = []) {
        $this->component = $component;
        $this->props = $props;
        return $this;
    }

    public function meta(string $title, string $description = null): PageBuilder {
        $this->title = $title;
        $this->description = $description;
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

    public function toResponse($request): \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
    {
        if ($this->title) {
            $this->breadcrumbs[] = crumb($this->title, $request->url());
        }

        return Inertia::render($this->component, [
            ...$this->props,
            '__meta_title' => $this->title,
            '__meta_description' => $this->description,
            '__meta_breadcrumbs' => $this->breadcrumbs
        ])->toResponse($request);
    }
}
