@extends('layouts.app')

@push('styles')
    @vite('css/library.css')
@endpush

@section('child')
    <div class="album py-5 bg-body-tertiary">
        <div class="container">
            <div class="row">
                <h4>Progress</h4>
            </div>
            <div class="list-group">
                @foreach ($books as $book)
                    <div class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between my-3">
                            <div class="mb-1" style="font-size: 1.125rem;">
                                <h5 class="mb-0">{{ $book->title }}</h5>
                                @if (isset($book->author))
                                    <small class="fs-6">{{ $book->author->name }}</small>
                                @else
                                    <small class="fs-6">Undefined Author</small>
                                @endif
                                @if (isset($book->publisher))
                                    <small class="fs-6">{{ "( {$book->publisher->name} )" }}</small>
                                @else
                                <small class="fs-6">( Undefined Publisher )</small>
                                @endif
                            </div>
                            <small>period: {{ $book->earliestReturnDate() }}</small>
                        </div>
                        {{-- <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small>And some small print.</small> --}}
                        <form action="" method="post">
                            <div class="btn-group w-100">
                                <button type="button"
                                    id="modal-btn"
                                    class="btn btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modal"
                                    data-bs-book-id="{{ $book->id }}"
                                    data-bs-book-title="{{ $book->title }}"
                                    data-bs-book-period="{{ $book->earliestReturnDate() }}">Return</button>
                                <a href="{{ route('books.detail', ['bookId' => $book->id]) }}" type="button" class="btn btn-outline-primary">Detail</a>
                            </div>
                        </form>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <x-modal title="本当に返却しますか？" labelBtnPositive="Return">
        <form method="POST" action="{{ route('rentals.update.update') }}">
            @csrf
            <input type="hidden" id="modal-user-id" name="modal-user-id" value="{{ Auth::user()->id }}">
            <input type="hidden" id="modal-book-id" name="modal-book-id" value="">
            <label for="modal-book-title" class="col-form-label">Title:</label>
            <input type="text" class="form-control form-control-plaintext" id="modal-book-title" name="modal-book-title" readonly>
            <label for="modal-book-period" class="col-form-label">Period:</label>
            <input type="text" class="form-control form-control-plaintext" id="modal-book-period" name="modal-book-period" readonly>
        </form>
    </x-modal>
@endsection

@push('scripts')
    <script>
        const modal = document.getElementById('modal')
        const btn = modal.querySelector('#btnPositive')
        btn.addEventListener('click', () => {
            modal.querySelector('.modal-body form').submit()
        })
        modal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget
            modal.querySelector('#modal-book-id').value = button.getAttribute('data-bs-book-id')
            modal.querySelector('#modal-book-title').value = button.getAttribute('data-bs-book-title')
            modal.querySelector('#modal-book-period').value = button.getAttribute('data-bs-book-period')
        })
    </script>
@endpush
