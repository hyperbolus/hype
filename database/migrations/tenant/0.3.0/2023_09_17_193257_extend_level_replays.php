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
        Schema::table('level_replays', function (Blueprint $table) {
            $table->unsignedTinyInteger('coins_collected')->nullable()->after('coins');
            $table->decimal('fps')->nullable();
            $table->tinyInteger('rating')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('level_replays', function (Blueprint $table) {
            $table->dropColumn('coins_collected');
            $table->dropColumn('fps');
            $table->dropColumn('rating');
        });
    }
};
