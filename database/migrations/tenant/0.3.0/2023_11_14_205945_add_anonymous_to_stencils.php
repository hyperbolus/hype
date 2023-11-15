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
        Schema::table('stencils', function (Blueprint $table) {
            $table->foreignId('author_id')->nullable()->change();

            $table->foreignId('anon_name')->nullable()->after('format');
            $table->foreignId('anon_password')->nullable()->after('format');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stencils', function (Blueprint $table) {
            $table->foreignId('author_id')->change();

            $table->dropColumn('anon_name');
            $table->dropColumn('anon_password');
        });
    }
};
