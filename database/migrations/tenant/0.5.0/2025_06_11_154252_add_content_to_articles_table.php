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
        Schema::table('articles', function (Blueprint $table) {
            $table->mediumText('content')->after('slug');;
            $table->json('metadata')->nullable()->after('slug');;

            $table->dropColumn('post_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tags', function (Blueprint $table) {
            $table->foreignId('post_id')->after('slug');

            $table->dropColumn('content');
            $table->dropColumn('metadata');
        });
    }
};
