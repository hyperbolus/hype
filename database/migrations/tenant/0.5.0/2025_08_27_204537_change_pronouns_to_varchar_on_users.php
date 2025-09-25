<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('pronouns')->nullable()->change();
            $table->unsignedTinyInteger('pronouns_visibility')->nullable()->after('pronouns');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('pronouns', ['he/him', 'she/her', 'they/them', 'she/they', 'he/they', 'it/its', 'any/all'])->default('they/them')->change();
            $table->dropColumn('pronoun_visibility');
        });
    }
};
