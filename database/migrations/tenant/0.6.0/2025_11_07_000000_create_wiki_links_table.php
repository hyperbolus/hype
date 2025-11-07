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
        Schema::create('wiki_links', function (Blueprint $table) {
            $table->id();

            $table->foreignId('origin_id');
            $table->foreignId('target_id')->nullable();
            $table->string('target_path')->nullable();
            $table->string('target_domain')->nullable();

            $table->tinyInteger('type');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wiki_links');
    }
};
