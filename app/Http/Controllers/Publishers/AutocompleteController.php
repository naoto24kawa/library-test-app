<?php

namespace App\Http\Controllers\Publishers;

use App\Http\Controllers\Controller;
use App\Models\Publisher;
use Illuminate\Http\Request;

class AutocompleteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $query = $request->get('query');
        $data = !empty($query) ? Publisher::where('name', 'LIKE', '%'. $query. '%')->get() : Publisher::all();

        return response()->json($data);
    }
}
