<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('relationships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_id');
            $table->foreignId('to_id');
            $table->tinyInteger('type');
            $table->boolean('accepted')->nullable();
            $table->tinyInteger('category')->nullable();
            $table->timestamps();

            $table->unique(['from_id', 'to_id', 'type'], 'unique_relationships');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relationships');
    }
};
