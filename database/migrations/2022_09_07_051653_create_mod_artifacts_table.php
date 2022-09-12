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
    public function up()
    {
        Schema::create('mod_artifacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mod_version_id');
            $table->string('game_version')->nullable();
            $table->enum('sdk', ['geode', 'megahack', 'hackermode'])->nullable();
            $table->string('sdk_version')->nullable();
            $table->unique(['mod_version_id', 'game_version', 'sdk', 'sdk_version']);
            $table->string('file');
            $table->unsignedBigInteger('downloads')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mod_artifacts');
    }
};
