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
        Schema::create('resource_versions', function (Blueprint $table) {
            $table->id();
            $table->intMorphs('resource');
            $table->string('version');
            $table->string('metadata')->nullable();
            $table->unique(['resource_id', 'resource_type', 'version', 'metadata']);
            $table->string('release_notes')->nullable();
            $table->timestamp('published')->nullable();
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
        Schema::dropIfExists('mod_versions');
    }
};
