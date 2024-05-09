<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RentalHistory extends Pivot
{
    protected $table='rental_histories';

    const TABLE='rental_histories';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function rentalStatus()
    {
        return $this->belongsTo(RentalStatus::class);
    }

    public function createdUser()
    {
        return $this->belongsTo(User::class, 'id', 'created_user_id');
    }
}
