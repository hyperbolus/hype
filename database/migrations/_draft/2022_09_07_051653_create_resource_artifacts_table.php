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
        Schema::create('resource_artifacts', function (Blueprint $table) {
            $table->id();
            $table->intMorphs('resource_version');
            $table->string('game_version')->nullable();

            $table->string('sdk')->nullable();
            $table->string('sdk_version')->nullable();

            $table->unique(['resource_version_id', 'resource_version_type', 'game_version', 'sdk', 'sdk_version'], 'resource_versions');

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
    public function down(): void
    {
        Schema::dropIfExists('mod_artifacts');
    }
};
