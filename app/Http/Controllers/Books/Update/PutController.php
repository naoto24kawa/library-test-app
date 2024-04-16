<?php

namespace App\Http\Controllers\Books\Update;

use App\Http\Controllers\Controller;
use App\Http\Requests\Books\UpdateRequest;
use App\Services\BooksService;

class PutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateRequest $request, BooksService $booksService)
    {
        $book = $booksService->createBook($request->form());
        if ($request->get('framework') == 'react')
        {
            return redirect()->intended('/react/books/'.$book->id.'?framework=react');
        }
        return redirect()
            ->route('index', ['bookId' => $book->id])
            ->with('feedback.success', '更新しました');
    }
}
