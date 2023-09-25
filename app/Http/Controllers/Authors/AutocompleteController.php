<?php

namespace App\Http\Controllers\Authors;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;

class AutocompleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $query = $request->get('query');
        $data = !empty($query) ? Author::where('name', 'LIKE', '%'. $query. '%')->get() : Author::all();

        return response()->json($data);
    }
}
