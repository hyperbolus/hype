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
        Schema::create('contests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique()->nullable();
            $table->string('blurb')->nullable();
            $table->string('hashtag')->nullable();
            $table->string('discord')->nullable();
            $table->text('content');
            $table->text('submission_content')->nullable();
            $table->timestampTz('published_at')->default(now());
            $table->timestampTz('start')->default(now()->addDays(3));
            $table->timestampTz('end')->default(now()->addWeeks(2));
            $table->timestampTz('voting_end')->default(now()->addWeeks(3));
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
            $table->foreignId('server_id')->nullable();
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
        Schema::dropIfExists('contests');
    }
};
