<?php

namespace App\Models;

use App\Models\User;
use App\Models\Author;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

class Book extends Model
{
    use HasFactory;

    protected $table='books';

    public function author() : BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function publisher() : BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function createdUser() : BelongsTo
    {
        return $this->belongsTo(User::class, 'created_user_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'book_id')->whereNull('parent_id')->orderBy('created_at', 'desc');
    }

    public function users($status = RentalStatus::ALL)
    {
        return $this->belongsToMany(User::class, RentalHistory::TABLE)
            ->using(RentalHistory::class)
            ->withPivot(array_values(Schema::getColumnListing(RentalHistory::TABLE)))
            ->wherePivotIn('rental_status_id', $status);
    }

    public function isRentable()
    {
        return $this->amount > $this->users(RentalStatus::PROGRESS)->count();
    }

    public function rentalTimes()
    {
        return $this->users(RentalStatus::ALL)->count();
    }

    public function earliestReturnDate()
    {
        $date = $this->users(RentalStatus::PROGRESS)->get()
            ->pluck('pivot.end_date')
            ->min();
        return is_null($date) ? null : Carbon::parse($date)->format('Y-m-d');
    }
}
