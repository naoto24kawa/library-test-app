@extends('layouts.app')

@push('styles')
    {{-- nothing --}}
@endpush

@section('child')
    <p>更新</p>
    @if (session('feedback.success'))
        <p style="color: green;">{{ session('feedback.success') }}</p>
    @endif
    <a href="{{ route('index') }}">戻る</a>
    <form action="{{ route('books.update.put', ['bookId' => $book->id]) }}" method="post">
        @method('PUT')
        @csrf
        <label for="book-title">タイトル</label>
        <span>120字まで</span>
        <textarea name="title" id="book-title" placeholder="タイトルを入力する">{{ $book->title }}</textarea>
        @error('title')
            <p style="color:red;">{{ $message }}</p>
        @enderror
        <button type="submit">更新</button>
    </form>
@endsection

@push('scripts')
    {{-- nothing --}}
@endpush
