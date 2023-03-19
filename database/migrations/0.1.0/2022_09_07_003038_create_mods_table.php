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
        Schema::create('mods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('blurb')->nullable();
            $table->foreignId('author_id')->nullable()->constrained('users')->cascadeOnUpdate();
            $table->string('author')->nullable();
            $table->text('description')->nullable();
            $table->string('banner_url')->nullable();
            $table->unsignedBigInteger('downloads')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('mods');
    }
};
