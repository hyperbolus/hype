<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('users', function (Blueprint $table) {
            DB::statement('SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";');
            $table->id()->from(14);
            $table->string('name')->unique();
            $table->string('name_format')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();

            $table->json('attributes')->nullable();

            $table->string('avatar_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->string('postbit_url')->nullable();

            $table->string('custom_title')->nullable();
            $table->string('youtube')->nullable();
            $table->string('twitch')->nullable();
            $table->string('twitter')->nullable();
            $table->string('discord')->nullable();
            $table->string('location')->nullable();
            $table->string('flag')->nullable();
            $table->enum('pronouns', ['he/him', 'she/her', 'they/them', 'she/they', 'he/they', 'it/its', 'any/all'])->default('they/them');
            $table->text('bio')->nullable();
            $table->text('signature')->nullable();

            $table->timestamp('birthday')->nullable();
            $table->unsignedTinyInteger('birthday_visibility')->nullable();

            $table->string('display_classes')->nullable();
            $table->foreignId('referrer_id')->nullable();
            $table->foreignId('primary_group_id')->nullable();
            $table->integer('reputation')->default(0);
            $table->integer('credits')->default(0);

            $table->unsignedBigInteger('time_online')->default(0);
            $table->unsignedSmallInteger('warning')->default(0);
            $table->timestamp('last_seen')->default(now());
            $table->timestamp('banned_at')->nullable();
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
        Schema::dropIfExists('users');
    }
};
