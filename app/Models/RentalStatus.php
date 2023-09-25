<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalStatus extends Model
{
    use HasFactory;

    const ALL = [
        11,12,13,14,15,
        21,22,23,24,25,
        31,32,33,34,35
    ];

    const PROGRESS = [
        11,12,
        21,22,
        31,32,
    ];

    const ENDED = [
        13,15,
        23,25,
        33,35
    ];
}
