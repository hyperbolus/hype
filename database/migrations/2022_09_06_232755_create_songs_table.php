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
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('artist')->nullable();
            $table->string('artist_youtube')->nullable();
            $table->unsignedBigInteger('artist_id')->nullable();
            $table->boolean('verified')->default(0);
            $table->string('video')->nullable();
            $table->string('link')->nullable();
            $table->unsignedInteger('size')->nullable();
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
        Schema::dropIfExists('songs');
    }
};
