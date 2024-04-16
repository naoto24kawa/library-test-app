<?php

namespace App\Http\Controllers\Books\Create;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Comment;
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
            'content' => $request->input('content'),
        ]);
        $book->comments()->save($comment); // TODO: 現状は新規追加。コメント返信の場合はaddChildする必要あり
        if ($request->get('framework') == 'react')
        {
            return redirect()
                ->intended('/react/books/'.$book->id.'?framework=react');
        }
        return redirect()->route('books.detail', ['bookId' => $bookId]);
    }
}
