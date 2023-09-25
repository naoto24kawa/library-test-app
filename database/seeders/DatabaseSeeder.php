<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // ↓↓↓マスターデータ↓↓↓
            RentalStatusSeeder::class,

            // ↓↓↓テストデータ↓↓↓
            UsersTableSeeder::class,
            AuthorsTableSeeder::class,
            PublishersTableSeeder::class,
            BooksTableSeeder::class, // depends on => user, author, publisher
        ]);
    }
}
