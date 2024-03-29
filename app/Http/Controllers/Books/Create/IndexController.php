<?php

namespace App\Http\Controllers\Books\Create;

use App\Http\Controllers\Controller;
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

    public function react()
    {
        $user = Auth::user();
        return Inertia::render('BooksUpsertPage', ['user' => $user]);

    }
}
