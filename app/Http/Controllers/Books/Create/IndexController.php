<?php

namespace App\Http\Controllers\Books\Create;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}
