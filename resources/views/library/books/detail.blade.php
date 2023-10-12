@extends('layouts.app')

@push('styles')
    {{-- nothing --}}
@endpush

@php
    $user = Auth::user();
@endphp

@section('child')
    <div class="album py-5 bg-body-tertiary">
        <div class="container">
            <div class="row mb-2">
                <div class="col-lg-6 col-md-12">
                    <h4>About</h4>
                    <x-book-card :user="$user" :book="$book" is_detail=true></x-book-card>
                </div>
                <div class="col-lg-6 col-md-12">
                    <h4>Comments</h4>
                    <form method="POST" action="{{ route('comments.create.book', ['bookId' => $book->id]) }}"
                        enctype="multipart/form-data" class="mb-3">
                        @csrf
                        <div class="input-group">
                            <textarea id="form-comment" name="form-comment" class="form-control" style="form-sizing: content;"
                                placeholder="comment something"></textarea>
                            <button type="submit" id="form-comment-btn" class="btn btn-outline-primary">Submit</button>
                        </div>
                    </form>
                    <div class="list-group">
                        @foreach ($book->comments as $comment)
                            <div class="list-group-item" aria-current="true">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="me-auto">
                                        <small>{{ $comment->createdUser->name }}</small>
                                        <p class="my-1">{{ $comment->content }}</p>
                                        <small>{{ $comment->created_at }}</small>
                                    </div>
                                    @if (Auth::id() == $comment->createdUser->id)
                                        <form action="{{ route('comments.delete.book', ['bookId' => $book->id]) }}"
                                            method="post">
                                            {{-- TODO: CSRFトークンが大量に生成されるのでフォームを統一したい --}}
                                            @csrf
                                            {{-- TODO: 以下、利用しないようにする->URL変更 --}}
                                            @method('DELETE')
                                            <input type="hidden" name="commentId" value="{{ $comment->id }}">
                                            <button type="submit" class="btn btn-link p-0 ms-2">
                                                <i class = "bi bi-trash"></i>
                                            </button>
                                        </form>
                                    @endif
                                </div>
                                @if ($comment->hasDescendants())
                                    <div class="list-group mt-2">
                                        @foreach ($comment->getDescendants() as $branch)
                                            <div class="list-group-item" aria-current="true">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="me-auto">
                                                        <small>{{ $branch->createdUser->name }}</small>
                                                        <p class="my-1">{{ $branch->content }}</p>
                                                        <small>{{ $branch->created_at }}</small>
                                                    </div>
                                                    @if (Auth::id() == $branch->createdUser->id)
                                                        <form
                                                            action="{{ route('comments.delete.book', ['bookId' => $book->id]) }}"
                                                            method="post">
                                                            {{-- TODO: CSRFトークンが大量に生成されるのでフォームを統一したい --}}
                                                            @csrf
                                                            {{-- TODO: 以下、利用しないようにする->URL変更 --}}
                                                            @method('DELETE')
                                                            <input type="hidden" name="commentId"
                                                                value="{{ $branch->id }}">
                                                            <input type="hidden" id="comment-id" name="comment-id"
                                                                value="{{ $branch->id }}">
                                                            <button type="submit" class="btn btn-link p-0 ms-2">
                                                                <i class = "bi bi-trash"></i>
                                                            </button>
                                                        </form>
                                                    @endif
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

    @yield('modal')
@endsection

@push('scripts')
    @yield('modal-script')

    <script>
        const formCommentBtn = document.getElementById('form-comment-btn')
        formCommentBtn.addEventListener('click', () => {
            // formCommentBtn.setAttribute('disabled', true) // TODO: double submitを止めたいがsubmitすら止まってしまう
        })
    </script>
@endpush
