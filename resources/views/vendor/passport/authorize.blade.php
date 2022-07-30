<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name') }} - Authorization</title>

    <!-- Styles -->
    <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
</head>
<body class="min-h-screen bg-gray-100">
<div class="flex flex-row justify-center text-center">
    <div class="rounded shadow bg-white px-4 py-2 mt-12">
        <div class="font-bold text-2xl">
            Authorization Request
        </div>
        <div>
            <!-- Introduction -->
            <p><strong>{{ $client->name }}</strong> is requesting permission to access your account.</p>
            <p>You are currently logged in as <strong>SeeBeyond</strong></p>

            <!-- Scope List -->
            @if (count($scopes) > 0)
                <div class="scopes">
                    <p><strong>This application will be able to:</strong></p>

                    <ul>
                        @foreach ($scopes as $scope)
                            <li>{{ $scope->description }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <p class="text-red-500 fixed top-0 left-0 ml-2">(not final design)</p>

            <div class="flex flex-row justify-around text-white p-2">
                <!-- Authorize Button -->
                <form class="py-1 px-2 bg-green-500 rounded" method="post" action="{{ route('oauth2::authorizations.approve') }}">
                    @csrf

                    <input type="hidden" name="state" value="{{ $request->state }}">
                    <input type="hidden" name="client_id" value="{{ $client->id }}">
                    <input type="hidden" name="auth_token" value="{{ $authToken }}">
                    <button type="submit" class="btn btn-success btn-approve">Authorize</button>
                </form>

                <!-- Cancel Button -->
                <form class="py-1 px-2 bg-red-500 rounded" method="post" action="{{ route('oauth2::authorizations.deny') }}">
                    @csrf
                    @method('DELETE')

                    <input type="hidden" name="state" value="{{ $request->state }}">
                    <input type="hidden" name="client_id" value="{{ $client->id }}">
                    <input type="hidden" name="auth_token" value="{{ $authToken }}">
                    <button class="btn btn-danger">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</div>
</body>
</html>
