<?php

namespace App\Http\Controllers\Books\Create;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $bookId = $request->route('bookId');
        $book = Book::findOrFail($bookId);
        $comment = Comment::factory()->create([
            'book_id' => $bookId,
            'content' => $request->input('form-comment'),
        ]);
        $book->comments()->save($comment); // TODO: 現状は新規追加。コメント返信の場合はaddChildする必要あり
        return redirect()->route('books.detail', ['bookId' => $bookId]);
    }
}
