<?php

namespace App\Services;

use App\Models\Author;
use App\Models\Book;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class BooksService
{
    public function getBooks()
    {
        return Book::query()->orderBy('created_at', 'DESC')->with('author:id,name', 'publisher:id,name')->paginate(12);
    }

    public function getBook($bookId) : Book
    {
        return Book::query()
            ->where('id', $bookId)
            ->with('author:id,name', 'publisher:id,name', 'in_progress')
            ->withCount('users')->firstOrFail();
    }

    public function createBook($form) : Book
    {
        $book = isset($form['id']) ? $this->getBook($form['id']) : new Book;

        $book->title = $form['title'];
        $book->description = $form['description'];
        $book->amount = $form['amount'];

        if (isset($form['cover'])) {
            // TODO: 過去のファイルを削除したい
            Storage::putFile('public/images/books', $form['cover']);
            $book->img_path = $form['cover']->hashName();
        }

        if (!empty($form['author']))
        {
            $author = Author::createOrFirst(['name' => $form['author']]); // TODO: Createしたかどうかわからないのが嫌
            $book->author()->associate($author);
        }
        if (!empty($form['publisher']))
        {
            $publisher = Publisher::createOrFirst(['name' => $form['publisher']]); // TODO: Createしたかどうかわからないのが嫌
            $book->publisher()->associate($publisher);
        }
        $user = User::firstOrFail('id', $form['created_user_id']);
        $book->createdUser()->associate($user);

        $book->save();

        return $book;
    }

    public function updateBook($bookId, $attr) : Book
    {
        $book = $this->getBook($bookId);
        $book->title = $attr['title'];
        $book->save();
        return $book;
    }

    public function deleteBook($bookId)
    {
        $book = $this->getBook($bookId);
        $book->delete();
        return $bookId;
    }
}