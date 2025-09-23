<?php

namespace App\Models;

use App\Enums\RelationshipType;
use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    public static function exists(RelationshipType $type, int $from, int $to): bool
    {
        return Relationship::query()
            ->where('type', $type)
            ->where('from_id', $from)
            ->where('to_id', $to)
            ->exists();
    }
}
