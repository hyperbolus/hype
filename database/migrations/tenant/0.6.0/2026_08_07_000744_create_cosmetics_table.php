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
        Schema::create('cosmetics', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();

            // what the store preview shows
            $table->enum('preview', ['name', 'avatar', 'postbit'])->nullable();
            // preset value, customizable, ability check
            $table->enum('kind', ['fixed', 'custom', 'perk'])->default('fixed');
            // each slot can only have one cosmetic
            $table->string('slot')->nullable();
            // just used for sorting
            $table->string('category')->nullable();

            // implementations
            $table->string('value')->nullable();
            // CSS classes
            $table->string('classes')->nullable();
            // CSS style
            $table->string('style')->nullable();

            // prices
            $table->unsignedInteger('credits')->nullable();
            $table->unsignedInteger('cents')->nullable();

            // Minimum Patreon tier
            $table->unsignedTinyInteger('premium_tier')->nullable();

            // User or possibly group owned cosmetics
            $table->nullableIntMorphs('owner');

            $table->timestamps();
        });

        Schema::create('cosmetic_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('cosmetic_id');
            $table->nullableIntMorphs('source');
            $table->string('notes')->nullable();
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->json('cosmetics')->nullable()->after('premium_months_total');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cosmetics');
        Schema::dropIfExists('cosmetic_user');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('cosmetics');
        });
    }
};
