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
        Schema::create('group_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('group_id');
            $table->string('reason')->nullable();
            $table->foreignId('referrer_id')->nullable();
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
        Schema::dropIfExists('group_memberships');
    }
};
