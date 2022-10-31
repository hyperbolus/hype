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
    public function up()
    {
        Schema::create('level_tag_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('level_id');
            $table->foreignId('tag_id');
            $table->unique(['user_id', 'level_id', 'tag_id']);
            $table->boolean('approved');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('level_tag_votes');
    }
};
