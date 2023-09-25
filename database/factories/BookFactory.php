<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

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
            'img_path' => fake()->image(storage_path('app/public/images/books'), 200, 300, null, false),
            'created_user_id' => User::firstOrFail(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
