<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\BooksService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request, BooksService $booksService)
    {
        $books = $booksService->getBooks();
        return view('library.index', ['books' => $books]);
    }

    public function react(Request $request, BooksService $booksService)
    {
        $user = $request->user()->loadMissing('in_progress');
        $books = $booksService->getBooks();
        return Inertia::render('LibraryListPage', ['user' => $user, 'books' => $books]);
    }
}
