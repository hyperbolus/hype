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
        Schema::create('wiki_pages', function (Blueprint $table) {
            $table->id();

            $table->tinyInteger('namespace');
            $table->tinyInteger('lang');
            $table->string('title');

            $table->unsignedBigInteger('length')->nullable();

            $table->foreignId('root_id')->nullable();
            $table->foreignId('parent_id')->nullable();
            $table->foreignId('redirect_id')->nullable();
            $table->foreignId('revision_id')->nullable();

            $table->timestamps();

            $table->unique(['namespace', 'lang', 'title'], 'unique_page');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wiki_pages');
    }
};
