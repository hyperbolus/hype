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
        Schema::create('forums', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->string('redirect')->nullable();
            $table->foreignId('parent_id')->nullable();
            $table->foreignId('group_id')->nullable();
            $table->boolean('category')->default(false);
            $table->boolean('visible')->default(false)->nullable();
            $table->integer('priority')->nullable();
            $table->string('password')->nullable();
            $table->json('permissions')->nullable();
            $table->integer('thread_points')->nullable();
            $table->integer('post_points')->nullable();
            $table->unsignedSmallInteger('meta')->nullable();
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
        Schema::dropIfExists('forums');
    }
};
