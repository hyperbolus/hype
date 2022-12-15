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
        Schema::create('level_level_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('level_id');
            $table->foreignId('level_tag_id');
            $table->unique(['level_id', 'level_tag_id']);
            $table->boolean('verified')->nullable();
            $table->float('score')->default(0);
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
        Schema::dropIfExists('level_level_tag');
    }
};
