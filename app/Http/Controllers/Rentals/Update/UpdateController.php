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
        $rentalsService->return($request->form());

        return redirect()->route('users.index');
    }
}
