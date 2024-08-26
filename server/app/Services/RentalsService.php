<?php

namespace App\Services;

use App\Models\Book;
use App\Models\User;

class RentalsService
{
    public function getBooks()
    {
        return Book::query()->orderBy('created_at', 'DESC')->paginate(12);
    }

    public function getBook($bookId) : Book
    {
        return Book::query()->where('id', $bookId)->firstOrFail();
    }

    public function rent($form)
    {
        $user = User::findOrFail($form['user_id']); // TODO: request->user()でいいのでは？
        $book = Book::findOrFail($form['book_id']);

        if ($book->isRentable()) {
            $user->books()->attach($book->id, [
                'rental_status_id' => 22,
                'start_date' => $form['start_date'],
                'end_date' => $form['end_date'],
                'created_user_id' => $user->id,
            ]);
        }
    }

    public function return($form)
    {
        $user = User::findOrFail($form['user_id']); // TODO: request->user()でいいのでは？
        $book = Book::findOrFail($form['book_id']);

        if ($user->isBorrowedBook($book->id)) {
            $user->books()->syncWithPivotValues($book->id, ['rental_status_id' => 33], false);
        }
    }
}