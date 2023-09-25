<?php

namespace App\Http\Requests\Rentals;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [];
    }

    public function form()
    {

        $user_id = $this->input('modal-user-id');
        $book_id = $this->input('modal-book-id');

        return compact(
            'user_id',
            'book_id',
        );
    }
}
