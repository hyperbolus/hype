<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Passport Routes
|--------------------------------------------------------------------------
|
| These routes are normally defined and registered within Passport's vendor
| files, but since I am a dumb child with weird mild OCD I extracted them
| here to define manually so that the endpoints can look nicer to me.
|
| RouteRegistrar.php branch 9.x b3d9f0560bb11d56125742be74c4f8beba43712c
|
*/

$options = [
    'prefix' => 'api/oauth2', // its like api, but not REALLY. aka. no api middlewarez
    'namespace' => '\Laravel\Passport\Http\Controllers',
    'as' => 'oauth2::'
];

Route::group($options, function () {
    /*
     * forAuthorization()
     *
     * Register the routes needed for authorization.
     */

    Route::group(['middleware' => ['web', 'auth'], 'as' => 'authorizations.'], function () {
        Route::get('/authorize', [
            'uses' => 'AuthorizationController@authorize',
            'as' => 'authorize',
        ]);

        Route::post('/authorize', [
            'uses' => 'ApproveAuthorizationController@approve',
            'as' => 'approve',
        ]);

        Route::delete('/authorize', [
            'uses' => 'DenyAuthorizationController@deny',
            'as' => 'deny',
        ]);
    });

    /*
     * forAccessTokens()
     *
     * Register the routes for retrieving and issuing access tokens.
     */

    Route::post('/token', [
        'uses' => 'AccessTokenController@issueToken',
        'as' => 'token',
        'middleware' => 'throttle',
    ]);

    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::get('/tokens', [
            'uses' => 'AuthorizedAccessTokenController@forUser',
            'as' => 'tokens.index',
        ]);

        Route::delete('/tokens/{token_id}', [
            'uses' => 'AuthorizedAccessTokenController@destroy',
            'as' => 'tokens.destroy',
        ]);
    });

    /*
     * forTransientTokens()
     *
     * Register the routes needed for refreshing transient tokens.
     */

    Route::post('/token/refresh', [
        'middleware' => ['web', 'auth'],
        'uses' => 'TransientTokenController@refresh',
        'as' => 'token.refresh',
    ]);

    /*
     * forClients()
     *
     * Register the routes needed for managing clients.
     */

    Route::group(['middleware' => ['web', 'auth', 'role:dev']], function () {
        Route::get('/clients', [
            'uses' => 'ClientController@forUser',
            'as' => 'clients.index',
        ]);

        Route::post('/clients', [
            'uses' => 'ClientController@store',
            'as' => 'clients.store',
        ]);

        Route::put('/clients/{client_id}', [
            'uses' => 'ClientController@update',
            'as' => 'clients.update',
        ]);

        Route::delete('/clients/{client_id}', [
            'uses' => 'ClientController@destroy',
            'as' => 'clients.destroy',
        ]);
    });

    /*
     * forPersonalAccessTokens()
     *
     * Register the routes needed for managing personal access tokens.
     */
    /*
    Route::group(['middleware' => ['web', 'auth']], function () {
        Route::get('/scopes', [
            'uses' => 'ScopeController@all',
            'as' => 'scopes.index',
        ]);

        Route::get('/personal-access-tokens', [
            'uses' => 'PersonalAccessTokenController@forUser',
            'as' => 'personal.tokens.index',
        ]);

        Route::post('/personal-access-tokens', [
            'uses' => 'PersonalAccessTokenController@store',
            'as' => 'personal.tokens.store',
        ]);

        Route::delete('/personal-access-tokens/{token_id}', [
            'uses' => 'PersonalAccessTokenController@destroy',
            'as' => 'personal.tokens.destroy',
        ]);
    });
    */
});
