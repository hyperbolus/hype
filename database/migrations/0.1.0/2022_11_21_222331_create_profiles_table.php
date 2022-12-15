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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->nullable();
            $table->unsignedBigInteger('account_id')->nullable();
            $table->unsignedBigInteger('player_id');
            $table->string('username');

            $table->string('youtube')->nullable();
            $table->string('twitter')->nullable();
            $table->string('twitch')->nullable();

            $table->unsignedInteger('rank')->nullable();
            $table->unsignedInteger('stars');
            $table->unsignedInteger('diamonds');
            $table->unsignedInteger('coins');
            $table->unsignedInteger('user_coins');
            $table->unsignedInteger('demons');
            $table->unsignedInteger('cp');
            $table->unsignedTinyInteger('moderator');

            $table->unsignedSmallInteger('icon');
            $table->unsignedSmallInteger('ship');
            $table->unsignedSmallInteger('ball');
            $table->unsignedSmallInteger('ufo');
            $table->unsignedSmallInteger('wave');
            $table->unsignedSmallInteger('robot');
            $table->unsignedSmallInteger('spider');
            $table->unsignedSmallInteger('col1');
            $table->unsignedSmallInteger('col2');
            $table->unsignedSmallInteger('death');
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
        Schema::dropIfExists('profiles');
    }
};
