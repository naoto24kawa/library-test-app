<?php

namespace App\Http\Requests\Books;

use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
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

        $id = $this->input('book_id');
        $title = $this->input('title');
        $author = $this->input('author.name');
        $publisher = $this->input('publisher.name');
        $description = $this->input('description');
        $amount = $this->input('amount');
        $cover = $this->file('cover');
        $created_user_id = $this->input('created_user_id');

        return compact(
            'id',
            'title',
            'author',
            'publisher',
            'description',
            'amount',
            'cover',
            'created_user_id'
        );
    }
}
