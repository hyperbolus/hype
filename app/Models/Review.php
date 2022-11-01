<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperReview
 * @mixin Eloquent
 */
class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'rating_gameplay',
        'rating_visuals',
        'rating_difficulty',
        'rating_overall',
        'review',
        'level_id',
        'user_id'
    ];

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function level(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id');
    }
}
