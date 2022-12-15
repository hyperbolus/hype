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
        Schema::create('contest_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contest_id');
            $table->foreignId('assigner_id')->nullable();
            $table->foreignId('assignee_id');
            $table->foreignId('parent_id')->nullable();
            $table->enum('role', ['host', 'admin', 'judge', 'participant', 'submitter', 'contributor']);
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
        Schema::dropIfExists('contest_roles');
    }
};
