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
        Schema::create('mod_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mod_id');
            $table->text('version');
            $table->string('tag')->nullable();
            $table->string('tag_version')->nullable();
            $table->string('metadata')->nullable();
            $table->unique(['mod_id', 'tag', 'tag_version', 'metadata']);
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
    public function down()
    {
        Schema::dropIfExists('mod_versions');
    }
};
