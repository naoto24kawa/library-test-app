<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTableMigration extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id')->unsigned()->nullable();
            $table->integer('position', false, true);

            $table->string('content', 300);
            $table->unsignedBigInteger('book_id');
            $table->unsignedBigInteger('created_user_id');
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('parent_id')
                ->references('id')
                ->on('comments')
                ->onDelete('set null');
            $table->foreign('book_id')
                ->references('id')
                ->on('books');
            $table->foreign('created_user_id')
                ->references('id')
                ->on('users');

        });

        Schema::create('comments_closure', function (Blueprint $table) {
            $table->increments('closure_id');

            $table->integer('ancestor', false, true);
            $table->integer('descendant', false, true);
            $table->integer('depth', false, true);

            $table->foreign('ancestor')
                ->references('id')
                ->on('comments')
                ->onDelete('cascade');

            $table->foreign('descendant')
                ->references('id')
                ->on('comments')
                ->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('comments_closure');
        Schema::dropIfExists('comments');
    }
}
