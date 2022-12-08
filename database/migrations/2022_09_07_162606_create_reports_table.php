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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->text('content');
            $table->text('action')->nullable();
            $table->foreignId('reportable_id')->nullable();
            $table->unsignedTinyInteger('reportable_type')->nullable();
            $table->unsignedSmallInteger('reason')->nullable();
            $table->unsignedSmallInteger('meta')->nullable();
            $table->foreignId('closed_by')->nullable();
            $table->timestamp('closed_at')->nullable();
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
        Schema::dropIfExists('reports');
    }
};
