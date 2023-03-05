<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('crowd_votes', function (Blueprint $table) {
            $table->id();
            // Who voted
            $table->foreignId('user_id');

            // This would be what the votable is for (level)
            $table->foreignId('related_id');
            $table->unsignedSmallInteger('related_type');

            // This would what you are voting on (tag/image/replay)
            $table->foreignId('votable_id');
            $table->unsignedSmallInteger('votable_type');

            $table->unique(['user_id', 'related_id', 'related_type', 'votable_id', 'votable_type'], 'unique_votes');

            // Did they vote for or against
            $table->boolean('approved');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('crowd_votes');
    }
};
