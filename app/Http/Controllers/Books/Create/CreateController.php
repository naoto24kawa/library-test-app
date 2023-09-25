<?php

namespace App\Http\Controllers\Books\Create;

use App\Http\Controllers\Controller;
use App\Http\Requests\Books\CreateRequest;
use App\Services\BooksService;

class CreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateRequest $request, BooksService $booksService)
    {
        $book = $booksService->createBook($request->form());
        return redirect()
            ->route('index')
            ->with('feedback.success', "登録しました ( title: {$book->title})");
    }
}