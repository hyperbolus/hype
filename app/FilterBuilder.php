<?php

namespace App;

use App\Traits\Sortable;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class FilterBuilder extends Builder implements Arrayable
{
    protected array $directions = [
        'desc',
        'asc',
    ];

    protected array $appends = [];

    protected array $filters = [];

    protected string $filter = 'all';

    protected string $direction = 'desc';

    protected string $sortBy = 'created_at';

    protected array $paginatorOptions = [
        'default' => 10,
        'min' => 1,
        'max' => 100,
    ];

    protected int $perPage = 10;

    /**
     * @param class-string<Model>|Builder $model
     */
    public function __construct(string|Builder $model)
    {
        parent::__construct($model instanceof Builder ? $model->getQuery() : (new $model)->newQuery()->getQuery());

        $this->setModel($model instanceof Builder ? $model->getModel() : new $model());
    }

    /**
     * Handle and sanitize request input for sorting model queries
     *
     * @param array|null $sortable
     * @param string $default
     * @return $this
     */
    public function sortOrderBy(?array $sortable = null, string $default = 'created_at'): FilterBuilder
    {
        $sortDir = request()->string('sortDir', 'desc');
        $this->direction = in_array($sortDir, $this->directions) ? $sortDir : 'desc';

        $this->sortBy = (string) request()->string('sortBy', $default);

        // If we weren't explicitly given allowed sortable attributes, grab them from the model
        if (gettype($sortable) !== 'array') $sortable = $this->getSortableAttributes();

        // Make sure any sortable attribute is in our allow-list
        // Otherwise silently switch to created_at
        $this->sortBy = in_array($this->sortBy, array_left($sortable)) ? $this->sortBy : $default;

        // Check if attribute has callable, else run orderBy
        if (array_key_exists($this->sortBy, $sortable) && $sortable[$this->sortBy] instanceof \Closure) {
            $sortable[$this->sortBy]($this);
        } else {
            $this->orderBy($this->sortBy, $this->direction);
        }

        return $this;
    }

    public function getSortableAttributes(): array {
        // If the model does not define its sortable attributes, default to created_at
        return in_array(Sortable::class, class_uses_recursive($this->model)) ? $this->model->getSortableAttributes() : ['created_at'];
    }

    public function getSortableFilters(): array {
        // If the model does not define its sortable attributes, default to created_at
        return in_array(Sortable::class, class_uses_recursive($this->model)) ? $this->model->getSortableFilters() : [];
    }

    /**
     * @param array<string, \Closure> $filters
     * @return $this
     */
    public function filters(?array $filters = null, bool $merge = false): FilterBuilder
    {
        // TODO: option to merge provided and model filters
        $this->filters = $filters ?? $this->getSortableFilters();
        if (!is_null($filters) && $merge) $this->filters = array_merge($filters, $this->getSortableFilters());

        $filter = (string) request()->string('filter', 'all');

        $isCallable = array_key_exists($filter, $this->filters) && $this->filters[$filter] instanceof \Closure;
        if ($isCallable) $this->filters[$filter]($this);
        $this->filter = $isCallable ? $filter : 'all';

        return $this;
    }

    public function getSortDir(): string
    {
        return $this->direction;
    }

    public function paginatorOptions(int $default, int $min = 1, int $max = 99): FilterBuilder
    {
        $this->paginatorOptions = [
            'default' => $default,
            'min' => $min,
            'max' => $max,
        ];

        return $this;
    }

    public function paginate($perPage = null, $columns = ['*'], $pageName = 'page', $page = null, $total = null): LengthAwarePaginator
    {
        $this->perPage = $perPage ?? clamp(request()->integer('perPage', $this->paginatorOptions['default']), $this->paginatorOptions['min'], $this->paginatorOptions['max']);

        $p = parent::paginate($this->perPage, $columns, $pageName, $page, $total);

        return $p->appends($this->getQueryParameters());
    }

    public function append(array $appends): FilterBuilder
    {
        $this->appends = $appends;

        return $this;
    }

    public function getQueryParameters(): array
    {
        $query = [
            'sortBy' => $this->sortBy,
            'sortDir' => $this->direction,
            'filter' => $this->filter,
            'perPage' => $this->perPage,
            ...$this->appends
        ];
    }

    public function toArray(): array
    {
        return [
            ...$this->getQueryParameters(),
            'sortable' => array_left($this->getSortableAttributes()),
            'filters' => array_left($this->filters),
            'paginator' => $this->paginatorOptions
        ];
    }
}
