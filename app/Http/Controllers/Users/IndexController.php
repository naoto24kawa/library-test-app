<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $books = $user->borrowedBooks();
        return view('library.users.index', [
            'user' => $user,
            'books' => $books,
        ]);
    }

    public function react(Request $request)
    {
        $user = $request->user();
        $books = $user->borrowedBooks();
        // dd($books[0]->pivot->end_date);
        return Inertia::render('MyPage', [
            'user' => $user,
            'books' => $books,
            ]);
    }
}
