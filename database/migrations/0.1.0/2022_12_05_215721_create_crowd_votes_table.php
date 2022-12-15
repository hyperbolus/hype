<?php

use Illuminate\Database\Eloquent\Relations\Relation;
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
        Schema::create('crowd_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->boolean('approved')->comment('Null is unchecked, false is explicitly denied');

            $table->foreignId('votable_id');
            $table->unsignedTinyInteger('votable_type');
            $table->index([
                'votable_id',
                'votable_type'
            ]);

            $table->foreignId('for_id');
            $table->unsignedTinyInteger('for_type');
            $table->index([
                'for_id',
                'for_type'
            ]);

            $table->unique(['user_id', 'votable_id', 'votable_type', 'for_id', 'for_type'], 'user_item_votes');
            $table->timestamps();
        });

        Relation::enforceMorphMap([

        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crowd_votes');
    }
};
