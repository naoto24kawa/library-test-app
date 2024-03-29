<?php

namespace App\Http\Controllers\Books\Delete;

use App\Http\Controllers\Controller;
use App\Services\BooksService;
use Illuminate\Http\Request;

class DeleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, BooksService $booksService)
    {
        $bookId = $booksService->deleteBook($request->route('bookId'));
        return redirect()
            ->route('index')
            ->with('feedback.success', "削除しました ( ID: {$bookId} )");
    }
}
