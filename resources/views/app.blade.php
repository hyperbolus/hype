<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:url" content="https://gdforums.com">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="DashNet">
    <meta property="og:title" content="{{ $page['props']['__meta_title'] ?? 'DashNet' }}">
    <meta property="og:description" content="{{ $page['props']['__meta_description'] ?? 'Your source for everything Geometry Dash' }}">

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

    <!-- Scripts -->
    @routes
    @vite('resources/js/app.js')
    @inertiaHead
</head>
<body id="body" class="font-sans antialiased dark bg-ui-900">
@inertia
</body>
</html>
