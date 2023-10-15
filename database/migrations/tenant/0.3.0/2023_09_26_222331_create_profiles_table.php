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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->nullable();
            $table->unsignedBigInteger('account_id')->nullable();
            $table->unsignedBigInteger('player_id');
            $table->string('username');

            // Social
            $table->string('youtube')->nullable();
            $table->string('twitter')->nullable();
            $table->string('twitch')->nullable();

            // Stats
            $table->unsignedInteger('rank')->nullable();
            $table->unsignedInteger('stars')->nullable();
            $table->unsignedInteger('diamonds')->nullable();
            $table->unsignedInteger('coins')->nullable();
            $table->unsignedInteger('user_coins')->nullable();
            $table->unsignedInteger('demons')->nullable();
            $table->unsignedInteger('cp')->nullable();

            // Miderator
            $table->unsignedTinyInteger('moderator')->nullable();

            // Misc
            $table->boolean('friend_requests')->nullable();
            $table->unsignedTinyInteger('messaging')->nullable();
            $table->unsignedTinyInteger('comment_visibility')->nullable();

            // Cosmetics
            $table->unsignedSmallInteger('icon')->nullable();
            $table->unsignedSmallInteger('ship')->nullable();
            $table->unsignedSmallInteger('ball')->nullable();
            $table->unsignedSmallInteger('ufo')->nullable();
            $table->unsignedSmallInteger('wave')->nullable();
            $table->unsignedSmallInteger('robot')->nullable();
            $table->unsignedSmallInteger('spider')->nullable();
            $table->unsignedSmallInteger('col1')->nullable();
            $table->unsignedSmallInteger('col2')->nullable();
            $table->unsignedSmallInteger('death')->nullable();
            $table->boolean('glow')->nullable();

            // Ext
            $table->unsignedBigInteger('ext_icon')->nullable();
            $table->unsignedBigInteger('ext_ship')->nullable();
            $table->unsignedBigInteger('ext_ball')->nullable();
            $table->unsignedBigInteger('ext_ufo')->nullable();
            $table->unsignedBigInteger('ext_wave')->nullable();
            $table->unsignedBigInteger('ext_robot')->nullable();
            $table->unsignedBigInteger('ext_spider')->nullable();
            $table->unsignedMediumInteger('ext_col1')->nullable();
            $table->unsignedMediumInteger('ext_col2')->nullable();
            $table->unsignedBigInteger('ext_death')->nullable();

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
        Schema::dropIfExists('profiles');
    }
};
