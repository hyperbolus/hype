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
        Schema::create('stencils', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id');
            $table->string('name');
            $table->text('description')->nullable();

            $table->string('format');

            $table->unsignedInteger('objects')->nullable();
            $table->unsignedInteger('views')->default(0);

            $table->mediumText('object_string')->comment('Temporary? Maybe we can come up with a better format...');
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
        Schema::dropIfExists('stencils');
    }
};
