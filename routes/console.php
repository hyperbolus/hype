<?php

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Schedule::call(function () {
    \App\Security::updateTorBlockList();
})->everySixHours();

Schedule::call(function () {
    $users = \App\Models\System\User::query()->where('premium_expires_at', '<', now())->get();

    $users->each(function ($user) {
        \App\Actions\VerifyPremiumPatreon::check($user);
    });
})->twiceDaily();
