<?php

namespace App\Http\Controllers\Books\Update;

use App\Http\Controllers\Controller;
use App\Http\Requests\Books\CreateRequest;
use App\Services\BooksService;

class PutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateRequest $request, BooksService $booksService)
    {
        $book = $booksService->createBook($request->form());
        return redirect()
            ->route('index', ['bookId' => $book->id])
            ->with('feedback.success', '更新しました');
    }
}
