<?php

use App\Http\Controllers\System\Auth\AuthenticatedSessionController;
use App\Http\Controllers\System\Auth\ConfirmablePasswordController;
use App\Http\Controllers\System\Auth\ConfirmedPasswordStatusController;
use App\Http\Controllers\System\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\System\Auth\EmailVerificationPromptController;
use App\Http\Controllers\System\Auth\NewPasswordController;
use App\Http\Controllers\System\Auth\PasswordController;
use App\Http\Controllers\System\Auth\PasswordResetLinkController;
use App\Http\Controllers\System\Auth\RegisteredUserController;
use App\Http\Controllers\System\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Guess
|
*/

//<editor-fold desc="Authentication">
Route::get('/auth/login', [AuthenticatedSessionController::class, 'create'])->middleware('guest')->name('auth::login');

$limiter = config('fortify.limiters.login');
$twoFactorLimiter = config('fortify.limiters.two-factor');
$verificationLimiter = config('fortify.limiters.verification', '6,1');

Route::post('/auth/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest:' . config('fortify.guard'),
        $limiter ? 'throttle:' . $limiter : null,
    ]));

Route::get('/auth/register', [RegisteredUserController::class, 'create'])
    ->middleware(['guest'])
    ->name('auth::register');

Route::post('/auth/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest']);

Route::post('/auth/logout', [AuthenticatedSessionController::class, 'destroy'])->name('auth::logout');
//</editor-fold>

//<editor-fold desc="Email Verification">
Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])
    ->middleware(['auth'])
    ->name('auth::verification.notice');

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['auth', 'signed', 'throttle:' . $verificationLimiter])
    ->name('auth::verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:' . $verificationLimiter])
    ->name('auth::verification.send');
//</editor-fold>

//<editor-fold desc="Passwords">
Route::put('/user/password', [PasswordController::class, 'update'])
    ->middleware(['auth'])
    ->name('auth::user-password.update');

Route::get('/confirm', [ConfirmablePasswordController::class, 'show'])
    ->middleware(['auth'])
    ->name('password.confirm');

Route::get('/confirmed-password-status', [ConfirmedPasswordStatusController::class, 'show'])
    ->middleware(['auth'])
    ->name('password.confirmation');

Route::post('/confirm', [ConfirmablePasswordController::class, 'store'])
    ->middleware(['auth']);
//</editor-fold>

//<editor-fold desc="Password Reset">
Route::get('/auth/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('auth::password.request');

Route::post('/auth/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('auth::password.email');

Route::get('/auth/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('auth::password.reset');

Route::post('/auth/reset-password', [NewPasswordController::class, 'store'])
    ->middleware(['guest:' . config('fortify.guard')])
    ->name('auth::password.update');
//</editor-fold>

//<editor-fold desc="Two Factor Authentication">
Route::get('/auth/2fa', [
    'uses' => 'TwoFactorAuthenticatedSessionController@create',
    'middleware' => 'guest',
    'as' => 'auth::2fa.login'
]);

Route::post('/auth/2fa', [
    'uses' => 'TwoFactorAuthenticatedSessionController@store',
    'middleware' => array_filter([
        'guest',
        $twoFactorLimiter ? 'throttle:' . $twoFactorLimiter : null,
    ]),
]);

Route::group(['auth', 'password.confirm'], function () {
    Route::post('/user/2fa', [
        'uses' => 'TwoFactorAuthenticationController@store',
        'as' => 'auth::2fa.enable'
    ]);

    /*Route::post('/user/confirmed-two-factor-authentication', [ConfirmedTwoFactorAuthenticationController::class, 'store'])
        ->middleware($twoFactorMiddleware)
        ->name('auth::two-factor.confirm'); TODO: investigate, new feature in v1.x */

    Route::delete('/user/2fa', [
        'uses' => 'TwoFactorAuthenticationController@destroy',
        'as' => 'auth::2fa.disable'
    ]);

    Route::get('/user/2fa/qr', [
        'uses' => 'TwoFactorQrCodeController@show',
        'as' => 'auth::2fa.qr'
    ]);

    Route::get('/user/2fa/recovery-codes', [
        'uses' => 'RecoveryCodeController@index',
        'as' => 'auth::2fa.recovery'
    ]);

    Route::post('/user/2fa/recovery-codes', [
        'uses' => 'RecoveryCodeController@store',
    ]);
});
//</editor-fold>
