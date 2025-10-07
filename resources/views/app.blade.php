<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:url" content="https://hyperbolus.net">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Hyperbolus">
    <meta property="og:title" content="{{ $page['props']['__meta_title'] ?? 'Hyperbolus' }}">
    <meta property="og:description" content="{{ $page['props']['__meta_description'] ?? 'Your source for everything Geometry Dash' }}">

    <link rel="icon" type="image/svg+xml" href="/icon.svg"/>
    <link rel="manifest" href="/site.webmanifest">

    @if(array_key_exists('__meta_canonical', $page['props']))<link rel="canonical" href="{{ $page['props']['__meta_canonical'] }}" />@endif
    @if(array_key_exists('sorting', $page['props']) && request()->getQueryString())<meta name="robots" content="noindex">@endif

    @if(config('hyperbolus.gtag_id'))
        <!-- Google -->
        <script>
            window.gtag = (..._) => {
                console.log('GTAG PUSH', _)
                window.dataLayer.push(_)
            };
            window.dataLayer = [
                'consent', 'default', {
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied',
                    'wait_for_update': 500,
                },
                'js', new Date(),
                'config', '{{ config('hyperbolus.gtag_id') }}'
            ];
        </script>
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('hyperbolus.gtag_id') }}"></script>
    @endif

    @if(config('hyperbolus.adsense_client'))
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={{ config('hyperbolus.adsense_client') }}" crossorigin="anonymous"></script>
    @endif

    <title inertia>Hyperbolus</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
    @routes
    @inertiaHead
    @vite('resources/js/app.js')
</head>
<body id="body" class="dark">
<div data-allow-mismatch id="teleports"></div>
@inertia
</body>
</html>
