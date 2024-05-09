<?php

namespace App\Http\Controllers\Rentals\Create;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rentals\CreateRequest;
use App\Services\RentalsService;

class CreateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CreateRequest $request, RentalsService $rentalsService)
    {
        $rentalsService->rent($request->form());

        if ($request->get('framework') == 'react')
        {
            return redirect()->intended(parse_url(url()->previous())['path']);
        }

        return redirect()->route('index');
    }
}
