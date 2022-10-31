<?php

namespace App\Models;

use App\Notifications\VerifyEmail;

//use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;


/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    use Impersonate;

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
        'last_seen' => 'datetime',
        'time_online' => 'integer'
    ];

    public function canImpersonate(): bool
    {
        return $this->hasRole('admin');
    }

    public function canBeImpersonated(): bool
    {
        return !$this->hasRole('admin');
    }

    /*
    public function accounts(): HasMany
    {
        return $this->hasMany(\App\Models\Player::class, 'owner_id');
    }
    */

    public function comments(): HasMany
    {
        return $this->hasMany(\App\Models\ProfileComment::class, 'user_id')->with('commenter');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(\App\Models\Message::class, 'recipient_id')->with('sender');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(\App\Models\Review::class, 'user_id');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(\App\Models\Thread::class, 'author_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(\App\Models\Post::class, 'author_id');
    }

    public function names(): HasMany
    {
        return $this->hasMany(\App\Models\NameChange::class, 'user_id');
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Group::class, 'group_memberships', 'user_id', 'group_id');
    }

    public function reviewedLevels(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Level::class, 'reviews', 'user_id', 'level_id');
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new VerifyEmail);
    }
}
