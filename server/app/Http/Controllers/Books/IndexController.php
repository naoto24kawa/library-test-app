<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\BooksService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
        $user = $request->user()->loadMissing('in_progress');
        $book = $booksService->getBook($request->route('bookId'));
        $comments = $book->comments->loadMissing('created_user', 'children.created_user');
        return Inertia::render('BookDetailPage', [
                'user' => $user,
                'book' => $book,
                'comments' => $comments,
            ]);
    }

    public function get(Request $request, BooksService $booksService)
    {
        $books = Book::query()
            ->with('author:id,name', 'publisher:id,name', 'in_progress')
            ->orderBy('id', 'desc')
            ->paginate(12);
        return response()->json($books);
    }

    public function getById(Request $request, BooksService $booksService)
    {
        $book = Book::query()
            ->where('id', $request->route('bookId'))
            ->with('author:id,name', 'publisher:id,name', 'in_progress')
            ->withCount('users')->firstOrFail();
        return response()->json($book);
    }

    public function create(Request $request, BooksService $booksService)
    {
        // TODO: 過去のファイルを削除したい
        Storage::putFile('public/images/books', $request->file('cover'));
        // $book->img_path = $request->input('cover')->hashName();

        $book = Book::factory()->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'amount' => $request->input('amount'),
            'img_path' => $request->file('cover')->hashName(),
        ]);

        $user = $request->user();
        $book->createdUser()->associate($user);

        $book->save();

        return response()->json($book);
    }

    public function updateById(Request $request, BooksService $booksService)
    {
        $book = Book::query()
            ->where('id', $request->route('bookId'))
            ->firstOrFail();
        $book->title = $request->input('title');
        $book->save();
        return response()->json($book);
    }

    public function delete(Request $request, BooksService $booksService)
    {
        $book = Book::findOrFail($request->input('bookId'));
        $book->delete();

        return response()->json($book);
    }

    public function getBorrowed(Request $request)
    {
        $books = $request->user()->borrowedBooks();
        return response()->json($books);
    }

    public function setRental(Request $request)
    {
        $user = $request->user();
        $book = Book::findOrFail($request->input('bookId'));
        if ($book->isRentable()) {
            $user->books()->attach($book->id, [
                'rental_status_id' => 22,
                'start_date' => $request->input('startDate'),
                'end_date' => $request->input('endDate'),
                'created_user_id' => $user->id,
            ]);
        }
        return response()->json($book);
    }

    public function setReturn(Request $request)
    {
        $user = $request->user();
        $book = Book::findOrFail($request->input('bookId'));

        if ($user->isBorrowedBook($book->id)) {
            $user->books()->syncWithPivotValues($book->id, ['rental_status_id' => 33], false);
        }
        return response()->json($book);
    }
}
