<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Services\BooksService;
use Illuminate\Http\Request;

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
}
