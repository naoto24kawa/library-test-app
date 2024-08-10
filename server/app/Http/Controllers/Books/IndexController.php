<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\BooksService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, BooksService $booksService)
    {
        $book = $booksService->getBook($request->route('bookId'));
        return view('library.books.detail', [
                'book' => $book,
            ]);
    }

    public function react(Request $request, BooksService $booksService)
    {
        $user = $request->user()->loadMissing('in_progress');
        $book = $booksService->getBook($request->route('bookId'));
        $comments = $book->comments->loadMissing('created_user', 'children.created_user');
        return Inertia::render('BookDetailPage', [
                'user' => $user,
                'book' => $book,
                'comments' => $comments,
            ]);
    }

    public function get(Request $request, BooksService $booksService)
    {
        $books = Book::query()->with('author')->paginate(12);
        return response()->json($books);
    }
    
    public function getById(Request $request, BooksService $booksService)
    {
        $book = Book::query()
            ->where('id', $request->route('bookId'))
            ->with('author:id,name', 'publisher:id,name', 'in_progress')
            ->withCount('users')->firstOrFail();
        return response()->json($book);
    }

    public function updateById(Request $request, BooksService $booksService)
    {
        $book = Book::query()
            ->where('id', $request->route('bookId'))
            ->firstOrFail();
        $book->title = $request->input('title');
        $book->save();
        return $book;
        return response()->json($book);
    }
}
