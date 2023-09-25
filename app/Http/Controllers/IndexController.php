<?php

namespace App\Http\Controllers;

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
        $books = $booksService->getBooks();
        return view('library.index', ['books' => $books]);
    }
}
