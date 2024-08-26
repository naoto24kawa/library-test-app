<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [App\Http\Controllers\Api\RegisterController::class, 'register']); // ユーザー登録
Route::post('/login', [App\Http\Controllers\Api\LoginController::class, 'login']); // ログイン

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/test', [App\Http\Controllers\Books\IndexController::class, 'get']);
    Route::get('/test/{bookId}', [App\Http\Controllers\Books\IndexController::class, 'getById']);

    Route::post('/test/rental', [App\Http\Controllers\Books\IndexController::class, 'setRental']);
    Route::post('/test/return', [App\Http\Controllers\Books\IndexController::class, 'setReturn']);
    Route::post('/test/create', [App\Http\Controllers\Books\IndexController::class, 'create']);
    Route::post('/test/update/{bookId}', [App\Http\Controllers\Books\IndexController::class, 'updateById']);
    Route::post('/test/delete', [App\Http\Controllers\Books\IndexController::class, 'delete']);
    Route::get('/test/borrowed', [App\Http\Controllers\Books\IndexController::class, 'getBorrowed']);
});

