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
            $table->foreignId('level_id');
            $table->unsignedTinyInteger('type');
            $table->unsignedTinyInteger('route')->nullable();
            $table->unsignedTinyInteger('coins')->default(0);
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by_id');
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
