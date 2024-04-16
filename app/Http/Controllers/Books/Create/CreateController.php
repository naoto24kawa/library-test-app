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
        if ($request->get('framework') == 'react')
        {
            return redirect()
                ->intended('/react/books/'.$book->id.'?framework=react')
                ->with('feedback.success', "登録しました ( title: {$book->title})");
        }
        return redirect()
            ->route('index')
            ->with('feedback.success', "登録しました ( title: {$book->title})");
    }
}