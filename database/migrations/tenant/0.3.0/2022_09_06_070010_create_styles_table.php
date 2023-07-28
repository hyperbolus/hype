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
        Schema::create('styles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('author_id');
            $table->string('blurb')->nullable();
            $table->text('description');
            $table->string('slug')->nullable();

            $table->string('license')->nullable();
            $table->unsignedSmallInteger('binaryVersion')->nullable();

            $table->unsignedBigInteger('views')->default(0);

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
        Schema::dropIfExists('styles');
    }
};
