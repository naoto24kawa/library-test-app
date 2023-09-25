<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function books($status = RentalStatus::ALL)
    {
        return $this->belongsToMany(Book::class, RentalHistory::TABLE)
            ->wherePivotIn('rental_status_id', $status)
            ->using(RentalHistory::class)
            ->withPivot(array_values(Schema::getColumnListing(RentalHistory::TABLE)));
    }

    public function borrowedBooks()
    {
        return $this->books(RentalStatus::PROGRESS)->get();
    }

    public function isBorrowedBook($book_id)
    {
        return $this->borrowedBooks()->contains('id', $book_id);
    }
}
