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
        Schema::create('discipline_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('moderator_id');
            $table->foreignId('disciplined_id');
            $table->text('reason')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->unsignedSmallInteger('meta')->nullable();
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
        Schema::dropIfExists('discipline_logs');
    }
};
