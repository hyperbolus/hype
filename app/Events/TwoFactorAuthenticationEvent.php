<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;

abstract class TwoFactorAuthenticationEvent
{
    use Dispatchable;

    /**
     * The user instance.
     *
     * @var \App\Models\System\User
     */
    public $user;

    /**
     * Create a new event instance.
     *
     * @param  \App\Models\System\User  $user
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }
}
