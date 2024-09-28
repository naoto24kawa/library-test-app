<?php

namespace App\Http\Controllers\Books;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Services\BooksService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Author;
use App\Models\Publisher;
use Illuminate\Support\Facades\Validator;

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
        $user = $request->user()->loadMissing('inProgress');
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
        // ログインユーザーを取得
        $user = $request->user();

        // builderの初期化
        $builder = Book::query();

        // タイトル検索
        $searchParams = $request->query();
        if (isset($searchParams['q'])) {
            $builder->where('title', 'like', '%' . $searchParams['q'] . '%');
        }

        // 基本情報の取得
        $books = $builder
            ->with('author', 'publisher')
            ->orderBy('id', 'desc')
            ->paginate(24);

        // 詳細情報の取得
        $books->map(function ($book) use ($user) {
            // レンタル可否
            $book->isRentable = $book->isRentable();
            // ログインユーザーの利用状況を取得
            if (!is_null($user)) {
                $book->isProgress = $book->isProgress($user);
                $book->returnDate = $book->returnDate($user);
            }
            return $book;
        });

        return response()->json($books);
    }

    public function getById(Request $request, BooksService $booksService)
    {
        // ログインユーザーを取得
        $user = $request->user();

        $book = Book::query()
            ->where('id', $request->route('bookId'))
            ->with('author:id,name', 'publisher:id,name', 'inProgress')
            ->withCount('users')->firstOrFail();

        // レンタル可否
        $book->isRentable = $book->isRentable();
        // ログインユーザーの利用状況を取得
        if (!is_null($user)) {
            $book->isProgress = $book->isProgress($user);
            $book->returnDate = $book->returnDate($user);
        }
        return response()->json($book);
    }

    public function create(Request $request, BooksService $booksService)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:120',
            'description' => 'string|max:500',
            'amount' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $book = Book::factory()->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'amount' => $request->input('amount'),
        ]);

        if (!is_null($request->file('image'))) {
            Storage::putFile('public/images/books', $request->file('image'));
            $book->img_path = $request->file('image')->hashName();
        }

        if (!empty($request->input('author'))) {
            $author = Author::createOrFirst(['name' => $request->input('author')]); // TODO: Createしたかどうかわからないのが嫌
            $book->author()->associate($author);
        }
        if (!empty($request->input('publisher'))) {
            $publisher = Publisher::createOrFirst(['name' => $request->input('publisher')]); // TODO: Createしたかどうかわからないのが嫌
            $book->publisher()->associate($publisher);
        }

        $user = $request->user();
        $book->createdUser()->associate($user);

        $book->save();

        return response()->json($book);
    }

    public function update(Request $request, BooksService $booksService)
    {
        $book = Book::query()
            ->where('id', $request->input('id'))
            ->firstOrFail();

        $book->title = $request->input('title');
        $book->description = $request->input('description');
        $book->amount = $request->input('amount');

        if (!is_null($request->file('image'))) {
            if (!is_null($book->img_path)) {
                Storage::delete('public/images/books/' . $book->img_path);
            }
            Storage::putFile('public/images/books', $request->file('image'));
            $book->img_path = $request->file('image')->hashName();
        }

        if (!empty($request->input('author'))) {
            $author = Author::createOrFirst(['name' => $request->input('author')]); // TODO: Createしたかどうかわからないのが嫌
            $book->author()->associate($author);
        }
        if (!empty($request->input('publisher'))) {
            $publisher = Publisher::createOrFirst(['name' => $request->input('publisher')]); // TODO: Createしたかどうかわからないのが嫌
            $book->publisher()->associate($publisher);
        }

        $user = $request->user();
        $book->createdUser()->associate($user);

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
        $user = $request->user();
        $books = $user->borrowedBooks();

        // 詳細情報の取得
        $books->map(function ($book) use ($user) {
            // レンタル可否
            $book->isRentable = $book->isRentable();
            // ログインユーザーの利用状況を取得
            if (!is_null($user)) {
                $book->isProgress = $book->isProgress($user);
                $book->returnDate = $book->returnDate($user);
            }
            return $book;
        });

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

    public function getBookFormData(Request $request)
    {
        $user = $request->user();

        $authors = Author::all();
        $publishers = Publisher::all();

        return response()->json([
            'authors' => $authors,
            'publishers' => $publishers,
        ]);
    }

    public function healthCheck()
    {
        return response()->json(['status' => 'ok']);
    }
}
