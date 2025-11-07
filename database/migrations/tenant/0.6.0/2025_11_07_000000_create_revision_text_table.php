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
        Schema::create('revision_text', function (Blueprint $table) {
            $table->id();

            $table->mediumText('content');
            $table->unsignedBigInteger('old_length');
            $table->unsignedBigInteger('new_length');
            $table->foreignId('revision_id');
            $table->string('key')->nullable();

            $table->unique(['revision_id', 'key'], 'unique_text');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revision_text');
    }
};
