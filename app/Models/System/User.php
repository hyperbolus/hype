<?php

namespace App\Models\System;

use App\Enums\RelationshipType;
use App\FilterBuilder;
use App\Models\Connection;
use App\Models\Content\Playlist;
use App\Models\Content\Post;
use App\Models\Content\Review;
use App\Models\Content\Thread;
use App\Models\Content\Video;
use App\Models\Cosmetic;
use App\Models\Game\Level;
use App\Models\Game\LevelReplay;
use App\Models\IP;
use App\Models\Relationship;
use App\Notifications\ResetPassword;
use App\Notifications\VerifyEmail;
use App\Traits\Sortable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
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
    use HasApiTokens, Notifiable;
    use HasRoles;
    use Impersonate;
    use Searchable;
    use Sortable;

    // <editor-fold desc="Internals">

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

        // Toggleable Visibility
        'location',
        'birthday',
        'pronouns',
        'weight',

        // Relations
        'ips'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'premium_expires_at' => 'datetime',
        'premium_started_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'last_seen' => 'datetime',
        'time_online' => 'integer',
        'reputation' => 'integer',
        'signature_visibility' => 'boolean',

        'location_visibility' => 'integer',
        'birthday_visibility' => 'integer',
        'pronoun_visibility' => 'integer',
        'weight_visibility' => 'integer',
    ];

    /**
     * Attributes with variable visibility
     */
    protected array $controlled = [
        'location' => 'location_visibility',
        'birthday' => 'birthday_visibility',
        'pronouns' => 'pronouns_visibility',
        'weight' => 'weight_visibility',
    ];

    protected static function booted(): void
    {
        // Determines attribute visibility for $controlled based on <field>_visibility value
        static::retrieved(function (User $user) {
            foreach ($user->controlled as $field => $vis) {
                $visibility = $user->getAttribute($vis);
                // TODO: public, private, friends etc.
                if ($visibility === 1) $user->makeVisible($field);
            }
        });
    }

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

    public function toSearchableArray(): array
    {
        return [
            'id' => (int) $this->id,
            'name' => $this->name,
            'flag' => $this->flag,
            'primary_group_id' => $this->primary_group_id
        ];
    }

    // </editor-fold>

    // <editor-fold desc="Helpers">
    /**
     * Make controllable hidden fields visible to the user itself despite visibility
     */
    public function itsMe(): static
    {
        if (auth()->id() === $this->id) foreach ($this->controlled as $field => $vis) $this->makeVisible($field);

        return $this;
    }

    public function isBlocking(int|User|null $user): bool
    {
        if ($user instanceof User) $user = $user->id;

        return Relationship::exists(RelationshipType::Block, $this->id, $user);
    }

    public function isBlockedBy(int|User|null $user): bool
    {
        if ($user instanceof User) $user = $user->id;

        return Relationship::exists(RelationshipType::Block, $user, $this->id);
    }

    public function withBlocks(?User $user = null): self
    {
        if (!auth()->check()) return $this;

        if (!$user) $user = request()->user();

        $this->setAttribute('blocked', $this->isBlockedBy($user));
        $this->setAttribute('blocking', $this->isBlocking($user));

        return $this;
    }

    public function changeName(string $new, ?string $reason = null, bool $hide = false, ?int $changer = null): void
    {
        // Create name change log
        $change = new NameChange();
        $change->user_id = $this->id;
        $change->from = $this->name;
        $change->to = $new;
        $change->reason = $reason;
        $change->setAttribute('hidden', $hide);
        $change->changer_id = $changer;
        $change->save();

        // Change user's actual name
        $this->name = $new;
        $this->save();
    }

    public function recalculateReputation(bool $save = false): void
    {
        $this->reputation = ReputationLog::query()
            ->whereHas('sender', function ($q) {
                $q->whereNull('banned_at');
            })
            ->where('recipient_id', $this->id)
            ->sum('reputation');

        if ($save) $this->save();
    }

    public function canImpersonate(): bool
    {
        return $this->hasRole('admin');
    }

    public function canBeImpersonated(): bool
    {
        return ! $this->hasRole('admin');
    }

    public function isPremium(): bool
    {
        return !is_null($this->premium_expires_at) && $this->premium_expires_at > now();
    }
    // </editor-fold>

    // <editor-fold desc="Scopes">

    public function scopeProfile(Builder $query): void
    {
        $query->select(['id', 'name', 'primary_group_id', 'created_at', 'last_seen', 'time_online', 'pronouns', 'avatar_url', 'banner_url', 'reputation', 'credits', 'banned_at']);
    }

    // </editor-fold>

    // <editor-fold desc="Auth">
    public function sendEmailVerificationNotification(): void
    {
        $this->notify(new VerifyEmail);
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPassword($token));
    }
    // </editor-fold>

    // <editor-fold desc="Relationships">

    public function linkedAccounts(): HasMany
    {
        return $this->hasMany(\App\Models\LinkedAccount::class, 'user_id');
    }

    public function videos(): HasMany {
        return $this->hasMany(Video::class);
    }

    public function playlists(): HasMany {
        return $this->hasMany(Playlist::class, 'owner_id');
    }

    public function blockedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'relationships', 'from_id', 'to_id');
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

    public function cosmetics(): BelongsToMany
    {
        return $this->belongsToMany(Cosmetic::class);
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

    // </editor-fold>
}
