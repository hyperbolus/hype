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
            $table->float('weight')->default(1)->after('warning');
            $table->unsignedTinyInteger('weight_visibility')->default(0)->after('warning');
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->float('weight')->nullable()->after('rating_overall');
            $table->unsignedTinyInteger('weight_visibility')->nullable()->after('rating_overall');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('weight');
            $table->dropColumn('weight_visibility');
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropColumn('weight');
            $table->dropColumn('weight_visibility');
        });
    }
};
