<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Services\BooksService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
        $authUser = Auth::user();
        $user = User::query()->where('id', $authUser->id)->with('in_progress')->firstOrFail();
        $book = $booksService->getBook($request->route('bookId'));
        $comments = $book->comments->loadMissing('created_user', 'children.created_user');
        return Inertia::render('BookDetailPage', [
                'user' => $user,
                'book' => $book,
                'comments' => $comments,
            ]);
    }
}
