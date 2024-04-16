<?php

namespace App\Models;

use Franzose\ClosureTable\Models\Entity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Entity
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'comments';

    /**
     * ClosureTable model instance.
     *
     * @var \App\Models\CommentClosure
     */
    protected $closure = 'App\Models\CommentClosure';

    protected $fillable = ['content', 'book_id', 'created_user_id'];

    public function book() : BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function created_user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }
}
