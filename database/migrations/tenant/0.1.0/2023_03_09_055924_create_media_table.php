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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('path')->unique();
            $table->string('filename');
            $table->nullableIntMorphs('owner');
            $table->string('mime')->nullable();
            $table->string('collection')->nullable();
            $table->unsignedTinyInteger('type')->nullable();
            $table->unsignedInteger('downloads')->default(0);
            $table->unsignedInteger('bytes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
