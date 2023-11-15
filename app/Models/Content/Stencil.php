<?php

namespace App\Models\Content;

use App\Models\System\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperStencil
 */
class Stencil extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'name',
        'description',
        'object_string',
        'username',
        'password',
        'format',
    ];

    protected $hidden = [
        'password'
    ];

    protected $with = [
        'author'
    ];

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id')->select(['id', 'name', 'flag', 'primary_group_id', 'created_at', 'reputation', 'pronouns', 'avatar_url', 'banner_url', 'postbit_url']);
    }
}
