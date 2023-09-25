<?php

namespace App\Http\Requests\Books;

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
        return [
            "title" => "required | max:120",
            "amount" => "required | between: 1, 100",
        ];
    }

    public function form()
    {
        $title = $this->input('title');
        $author = $this->input('author');
        $publisher = $this->input('publisher');
        $description = $this->input('description');
        $amount = $this->input('amount');
        $created_user_id = $this->input('created_user_id');

        return compact(
            'title',
            'author',
            'publisher',
            'description',
            'amount',
            'created_user_id'
        );
    }
}
