# Helpers

## crumb()

```php
crumb(string $text, ?string $url = null, bool $show = true): array
```
### Arguments
- text
- title
- show

#### $show
Callback determining if the breadcrumb appears. Can be used to conditionally show a route like so:

```php
crumb('Secret Crumb', 'dashboard.secret', fn() => rand(0, 1) > 0.1)
```
