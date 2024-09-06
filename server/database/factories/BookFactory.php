<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Publisher;
use App\Models\User;
use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->realText(15),
            'description' => fake()->realText(60),
            'author_id' => Author::query()->inRandomOrder()->first(),
            'publisher_id' => Publisher::query()->inRandomOrder()->first(),
            'amount' => 1,
            'created_user_id' => User::firstOrFail(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }

    // TODO: Divで代用する実装に変更したため不要。削除可否を検討する。
    // public function configure()
    // {
    //     return $this->afterCreating(function (Book $book) {
    //         // if (is_null($book->img_path)) {
    //         //     $book->img_path = fake()->image(storage_path('app/public/images/books'), 300, 400, null, false, false, $book->title, true);
    //         // }
    //         // $book->save();
    //     });
    // }
}
