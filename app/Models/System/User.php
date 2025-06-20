<?php

namespace App\Models\System;

use App\FilterBuilder;
use App\Models\Connection;
use App\Models\Content\Playlist;
use App\Models\Content\Post;
use App\Models\Content\Review;
use App\Models\Content\Thread;
use App\Models\Content\Video;
use App\Models\Forge\Mod;
use App\Models\Game\Level;
use App\Models\Game\LevelReplay;
use App\Models\IP;
use App\Notifications\ResetPassword;
use App\Notifications\VerifyEmail;
use App\Traits\Sortable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Laravel\Passport\HasApiTokens;
use Laravel\Scout\Searchable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @mixin IdeHelperUser
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    use Impersonate;
    use Searchable;
    use Sortable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'referrer_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email',
        'referrer_id',
        'location',
        'birthday',
        'ips'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_seen' => 'datetime',
        'time_online' => 'integer',
        'reputation' => 'integer',
        'signature_visibility' => 'boolean'
    ];

    public function getSortableAttributes(): array
    {
        return [
            'id',
            'name' => function(FilterBuilder $q) {
                $q->orderByRaw('LOWER(name) ' . $q->getSortDir());
            },
            'reputation' => function(FilterBuilder $q) {
                $q->where('reputation', '>', 0)
                    ->orderBy('reputation', $q->getSortDir());
            },
            'credits',
            'reviews_count',
            'created_at'
        ];
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPassword($token));
    }

    public function recalculateReputation() {
        $this->reputation = ReputationLog::query()
            ->whereHas('sender', function ($q) {
                $q->whereNull('banned_at');
            })
            ->where('recipient_id', $this->id)
            ->sum('reputation');
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => (int) $this->id,
            'name' => $this->name,
            'flag' => $this->flag,
            'primary_group_id' => $this->primary_group_id
        ];
    }

    public function canImpersonate(): bool
    {
        return $this->hasRole('admin');
    }

    public function canBeImpersonated(): bool
    {
        return ! $this->hasRole('admin');
    }

    /*
    public function accounts(): HasMany
    {
        return $this->hasMany(\App\Models\Player::class, 'owner_id');
    }
    */
    public function scopeProfile(Builder $query): void
    {
        $query->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'reputation', 'credits', 'banned_at']);
    }

    public function reputation(): HasMany
    {
        return $this->hasMany(ReputationLog::class, 'recipient_id');
    }

    public function reputes(): HasMany
    {
        return $this->hasMany(ReputationLog::class, 'recipient_id');
    }

    public function ips(): HasMany
    {
        return $this->hasMany(IP::class);
    }

    public function connections(): HasMany
    {
        return $this->hasMany(Connection::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ProfileComment::class, 'user_id')->with('commenter');
    }

    public function replays(): HasMany
    {
        return $this->hasMany(LevelReplay::class, 'submitter_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'recipient_id')->with('sender');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'user_id');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class, 'author_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'author_id');
    }

    public function names(): HasMany
    {
        return $this->hasMany(NameChange::class, 'user_id');
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'group_memberships', 'user_id', 'group_id');
    }

    public function reviewedLevels(): BelongsToMany
    {
        return $this->belongsToMany(Level::class, 'reviews', 'user_id', 'level_id');
    }

    public function purchasedMods(): BelongsToMany
    {
        return $this->belongsToMany(Mod::class, 'purchases', 'user_id', 'level_id')->wherePivot('type', '=', '1');
    }

    /**
     * Send the email verification notification.
     */
    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new VerifyEmail);
    }

    public function videos(): HasMany {
        return $this->hasMany(Video::class);
    }

    public function playlists(): HasMany {
        return $this->hasMany(Playlist::class, 'owner_id');
    }
}
