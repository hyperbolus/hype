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
        Schema::create('contests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->string('blurb')->nullable();
            $table->string('hashtag')->nullable();
            $table->text('content');
            $table->text('submission_content')->nullable();
            $table->timestampTz('published_at')->nullable();
            $table->timestampTz('start')->nullable();
            $table->timestampTz('end')->nullable();
            $table->timestampTz('voting_end')->nullable();
            $table->integer('participants')->default(0)->nullable();
            $table->integer('submissions')->default(0)->nullable();
            $table->enum('vote_permission', ['closed', 'submitters', 'contributors', 'public']);
            $table->boolean('rating_queue')->default(true);
            $table->boolean('ranked')->default(true);
            $table->boolean('judged')->default(false);
            $table->boolean('unlisted')->default(false);
            $table->boolean('lock_changes')->default(true);
            $table->boolean('submissions_hidden')->default(false);
            $table->boolean('results_hidden')->default(false);
            $table->boolean('late_submissions')->default(false);
            $table->unsignedTinyInteger('queue_unlock')->default(true);
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
        Schema::dropIfExists('contests');
    }
};
