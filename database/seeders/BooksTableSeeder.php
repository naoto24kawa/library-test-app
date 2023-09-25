<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Storage::exists('public/images/books')
            ? Storage::delete(Storage::allFiles('public/images/books'))
            : Storage::makeDirectory('public/images/books');

        Book::factory(30)->create()->each(function ($book) {
            $comments = Comment::factory(3)->create([
                'book_id' => $book->id,
                'created_user_id' => 1, // TODO: 速度の問題でマジックナンバーにしている。どうにかしたい。
            ]);
            foreach ($comments as $i => $comment) {
                if ($i == 0) continue;
                $comments[$i - 1]->addChild($comment);
                $comment->save();
            }
        });
    }
}
