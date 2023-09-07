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
        Schema::create('level_replays', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submitter_id');
            $table->string('source')->nullable();
            $table->foreignId('level_id');
            $table->string('format');
            $table->string('route')->nullable();
            $table->unsignedTinyInteger('coins')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by_id')->nullable();
            $table->string('notes')->nullable();
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
        Schema::dropIfExists('level_replays');
    }
};
