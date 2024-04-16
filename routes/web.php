<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

// Route::get('/react/{any}', function () {
//     return view('react');
// })->where('any', '.*');
Route::prefix('react')->group(function() {
    Route::get('/hoge', function () {
        return Inertia::render('hoge');
    });
    Route::get('/app', [\App\Http\Controllers\IndexController::class, 'react']);
    Route::get('/login', function () {
        return Inertia::render('LoginPage');
    });
    Route::get('/register', function () {
        return Inertia::render('UserRegisterPage');
    });
    Route::get('/books', [\App\Http\Controllers\IndexController::class, 'react']);
    Route::get('/books/{bookId}', [\App\Http\Controllers\Books\IndexController::class, 'react']);
    Route::get('/books/create', [\App\Http\Controllers\Books\Create\IndexController::class, 'react']);
    Route::get('/books/update/{bookId}', [\App\Http\Controllers\Books\Update\IndexController::class, 'react']);
});

// Route::get('/sample', [\App\Http\Controllers\Controllers\IndexController::class, 'show']);
// Route::get('/sample/{id}', [\App\Http\Controllers\Controllers\IndexController::class, 'showId']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/authors/autocomplete', \App\Http\Controllers\Authors\AutocompleteController::class)->name('authors.autocomplete');
Route::get('/publishers/autocomplete', \App\Http\Controllers\Publishers\AutocompleteController::class)->name('publishers.autocomplete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/user', \App\Http\Controllers\Users\IndexController::class)->name('users.index');

    Route::get('/books', [\App\Http\Controllers\IndexController::class, 'index'])->name('index');
    Route::get('/books/{bookId}', \App\Http\Controllers\Books\IndexController::class)->name('books.detail');

    Route::get('/books/create', \App\Http\Controllers\Books\Create\IndexController::class)->name('books.create.index');
    Route::post('/books/create', \App\Http\Controllers\Books\Create\CreateController::class)->name('books.create.upsert');

    Route::get('/books/update/{bookId}', \App\Http\Controllers\Books\Update\IndexController::class)->name('books.update.index');
    Route::post('/books/update/{bookId}', \App\Http\Controllers\Books\Update\PutController::class)->name('books.update.put');

    Route::delete('/books/delete/{bookId}', \App\Http\Controllers\Books\Delete\DeleteController::class)->name('books.delete.delete');

    Route::post('/comments/books/{bookId}', \App\Http\Controllers\Books\Create\CommentController::class)->name('comments.create.book');
    Route::delete('/comments/books/{bookId}', \App\Http\Controllers\Books\Delete\CommentController::class)->name('comments.delete.book');

    Route::post('/rentals/create', \App\Http\Controllers\Rentals\Create\CreateController::class)->name('rentals.create.create');
    Route::post('/rentals/update', \App\Http\Controllers\Rentals\Update\UpdateController::class)->name('rentals.update.update');
});

require __DIR__.'/auth.php';
