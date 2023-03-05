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

Route::get('/confirm', [ConfirmablePasswordController::class, 'show'])->name('password.confirm')->middleware('auth');

Route::name('auth::')->group(function () {
    //<editor-fold desc="Authentication">
    Route::middleware('guest')->group(function () {
        Route::get('/auth/login', [AuthenticatedSessionController::class, 'create'])->name('login');

        Route::post('/auth/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:5,1');

        Route::get('/auth/register', [RegisteredUserController::class, 'create'])->name('register');

        Route::post('/auth/register', [RegisteredUserController::class, 'store']);

        Route::post('/auth/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
    //</editor-fold>

    //<editor-fold desc="Email Verification">
    Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])
        ->middleware(['auth'])
        ->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['auth', 'signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware(['auth', 'throttle:6,1'])
        ->name('verification.send');
    //</editor-fold>

    //<editor-fold desc="Passwords">
    Route::middleware('auth')->group(function () {
        Route::put('/user/password', [PasswordController::class, 'update'])
            ->name('user-password.update');

        //Route::get('/confirm', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');

        Route::get('/confirmed-password-status', [ConfirmedPasswordStatusController::class, 'show'])
            ->name('password.confirmation');

        Route::post('/confirm', [ConfirmablePasswordController::class, 'store']);
    });
//</editor-fold>

    //<editor-fold desc="Password Reset">
    Route::middleware('guest')->name('password')->group(function () {
        Route::get('/auth/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');

        Route::post('/auth/forgot-password', [PasswordResetLinkController::class, 'store'])->name('email');

        Route::get('/auth/reset-password/{token}', [NewPasswordController::class, 'create'])->name('reset');

        Route::post('/auth/reset-password', [NewPasswordController::class, 'store'])->name('update');
    });
    //</editor-fold>

    //<editor-fold desc="Two Factor Authentication">
    Route::get('/auth/2fa', [\App\Http\Controllers\System\Auth\TwoFactorAuthenticatedSessionController::class, 'create'])->middleware(['guest'])->name('2fa.login');

    Route::post('/auth/2fa', [\App\Http\Controllers\System\Auth\TwoFactorAuthenticatedSessionController::class, 'store'])->middleware(['guest', 'throttle:6,1']);

    Route::middleware(['auth', 'password.confirm'])->group(function () {
        Route::post('/user/2fa', [\App\Http\Controllers\System\Auth\TwoFactorAuthenticationController::class, 'store'])->name('enable');

        /*Route::post('/user/confirmed-two-factor-authentication', [ConfirmedTwoFactorAuthenticationController::class, 'store'])
            ->middleware($twoFactorMiddleware)
            ->name('auth::two-factor.confirm'); TODO: investigate, new feature in v1.x */

        Route::delete('/user/2fa', [\App\Http\Controllers\System\Auth\TwoFactorAuthenticationController::class, 'destroy'])->name('disable');

        Route::get('/user/2fa/qr', [\App\Http\Controllers\System\Auth\TwoFactorQrCodeController::class, 'show'])->name('qr');

        Route::get('/user/2fa/recovery-codes', [\App\Http\Controllers\System\Auth\RecoveryCodeController::class, 'index'])->name('recovery');

        Route::post('/user/2fa/recovery-codes', [\App\Http\Controllers\System\Auth\RecoveryCodeController::class, 'store']);
    })->name('2fa.');
    //</editor-fold>
});
