<?php

namespace App\Http\Controllers\Books\Update;

use App\Http\Controllers\Controller;
use App\Services\BooksService;
use App\Models\Author;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, BooksService $booksService)
    {
        $book = $booksService->getBook($request->route('bookId'));
        return view('library.books.upsert', compact('book'));
    }

    public function react(Request $request, BooksService $booksService)
    {
        $user = Auth::user();
        $book = $booksService->getBook($request->route('bookId'));
        $authors = Author::all();
        $publishers = Publisher::all();

        return Inertia::render('BooksUpdatePage', [
            'user' => $user,
            'book' => $book,
            'authors' => $authors,
            'publishers' => $publishers,
        ]);
    }
}
