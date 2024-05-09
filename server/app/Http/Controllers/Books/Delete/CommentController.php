<?php

namespace App\Http\Controllers\Books\Delete;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $bookId = $request->route('bookId');
        $commentId = $request->input('commentId');

        $comment = Comment::findOrFail($commentId);
        if ($comment->isRoot()) {
            $comment->delete();
        } else if ($comment->hasDescendants()) {
            $parent = $comment->getParent();
            $child = $comment->getFirstChild();
            $parent->addChild($child);
            $comment->delete();
        }
        return redirect()->route('books.detail', ['bookId' => $bookId]);
    }
}
