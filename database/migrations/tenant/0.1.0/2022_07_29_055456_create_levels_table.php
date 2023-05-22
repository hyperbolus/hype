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
        Schema::create('levels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nong_id')->nullable();
            $table->string('banner_url')->nullable();
            $table->string('name');
            $table->string('creator');
            $table->string('description');

            $table->unsignedTinyInteger('difficulty')->nullable();
            $table->boolean('featured')->nullable();
            $table->boolean('epic')->nullable();
            $table->boolean('coins_verified')->nullable();
            $table->unsignedTinyInteger('coins')->nullable();
            $table->unsignedTinyInteger('stars')->nullable();
            $table->unsignedTinyInteger('length')->nullable();
            $table->unsignedInteger('objects')->nullable();
            $table->unsignedBigInteger('downloads')->nullable();
            $table->bigInteger('likes')->nullable();
            $table->foreignId('song_id')->nullable();
            $table->string('song_name')->nullable();
            $table->string('song_author')->nullable();
            $table->string('song_url')->nullable();

            $table->float('rating_gameplay')->nullable();
            $table->float('rating_visuals')->nullable();
            $table->float('rating_difficulty')->nullable();
            $table->float('rating_overall')->nullable();
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
        Schema::dropIfExists('levels');
    }
};
