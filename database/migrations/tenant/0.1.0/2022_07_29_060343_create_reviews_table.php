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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('level_id');
            $table->foreignId('user_id');

            $table->text('review')->nullable();

            $table->tinyInteger('rating_gameplay')->nullable();
            $table->tinyInteger('rating_visuals')->nullable();
            $table->tinyInteger('rating_difficulty')->nullable();
            $table->tinyInteger('rating_overall')->nullable();

            $table->softDeletes();
            $table->approved();
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
        Schema::dropIfExists('reviews');
    }
};
