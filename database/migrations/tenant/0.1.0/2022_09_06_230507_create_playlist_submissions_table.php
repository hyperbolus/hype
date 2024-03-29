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
        Schema::create('playlist_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submitter_id')->nullable();
            $table->boolean('accepted')->default(false);
            $table->string('rank')->nullable();
            $table->foreignId('playlist_id');
            $table->foreignId('review_id')->nullable();
            $table->foreignId('level_id');
            $table->foreignId('server_id');
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
        Schema::dropIfExists('playlist_submissions');
    }
};
