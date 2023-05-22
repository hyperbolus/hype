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
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reactable_id');
            $table->unsignedSmallInteger('reactable_type');
            $table->foreignId('reacter_id');
            $table->unsignedSmallInteger('emote');
            $table->unique(['reactable_id', 'reactable_type', 'reacter_id', 'emote']);
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
        Schema::dropIfExists('post_likes');
    }
};
