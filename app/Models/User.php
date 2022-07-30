<?php

namespace App\Models;

use App\Notifications\VerifyEmail;
//use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /*
    public function accounts(): HasMany
    {
        return $this->hasMany(\App\Models\Player::class, 'owner_id');
    }
    */

    public function reviews(): HasMany
    {
        return $this->hasMany(\App\Models\Review::class, 'user_id');
    }

    public function reviewedLevels(): \Illuminate\Database\Eloquent\Relations\HasManyThrough
    {
        return $this->belongsToMany(\App\Models\Level::class, 'reviews', 'user_id', 'level_id');
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }
}
