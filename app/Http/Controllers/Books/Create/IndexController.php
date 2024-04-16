<?php

namespace App\Http\Controllers\Books\Create;

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
    public function __invoke(Request $request)
    {
        return view('library.books.upsert', [
                'authors' => [],
                'publishers' => [],
            ]);
    }

    public function react(Request $request, BooksService $booksService)
    {
        $user = Auth::user();
        $authors = Author::all();
        $publishers = Publisher::all();

        return Inertia::render('BooksUpdatePage', [
            'user' => $user,
            'authors' => $authors,
            'publishers' => $publishers,
        ]);
    }
}
