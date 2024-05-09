<?php

namespace App\Http\Controllers\Rentals\Update;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rentals\UpdateRequest;
use App\Services\RentalsService;

class UpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateRequest $request, RentalsService $rentalsService)
    {
        // dd(parse_url(url()->previous())["path"]);
        $rentalsService->return($request->form());

        if ($request->get('framework') == 'react')
        {
            return redirect()->intended(parse_url(url()->previous())['path']);
        }

        return redirect()->route('users.index');
    }
}
