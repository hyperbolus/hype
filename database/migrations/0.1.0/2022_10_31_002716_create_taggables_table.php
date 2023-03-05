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
        Schema::create('taggables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('taggable_id');
            $table->unsignedSmallInteger('taggable_type');
            $table->foreignId('tag_id');
            $table->unique(['taggable_id', 'taggable_type', 'tag_id']);
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
    public function down(): void
    {
        Schema::dropIfExists('taggable_tag');
    }
};
