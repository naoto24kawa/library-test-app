@props([
    'user',
    'book',
    'is_detail',
    'type',
])

@php
    $userId = $user->id;
    $userName = $user->name;
    $bookId = $book->id;
    $bookTitle = $book->title;
    $bookDescription = $book->description;
    $author = $book->author?->name ?? 'Undefined Author';
    $publisher = $book->publisher?->name ?? 'Undefined Publisher';
    $rentalTimes = $book->rentalTimes() ?? 0;
    $returnDate = $book->earliestReturnDate() ?? 'Available';
    $isBorrowed = $user->isBorrowedBook($bookId);
    $isRentable = $book->isRentable();
@endphp

<div class="card shadow-sm mb-1">
    <div class="row">
        <div class="col-4">
            @if (is_null($book->img_path))
                <svg class="bd-placeholder-img card-img w-100 h-100"
                    style="border-bottom-right-radius: 0; border-top-right-radius: 0;"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{ $bookTitle }}</text>
                </svg>
            @else
                <img src="{{ asset('/storage/images/books/'. $book->img_path) }}" class="card-img h-100" style="object-fit: cover; object-position: center; border-bottom-right-radius: 0; border-top-right-radius: 0;" alt="{{ $bookTitle }}">
            @endif
        </div>
        <div class="col-8">
            <div class="card-body h-100">
                <h5 class="card-title mb-2">{{ $bookTitle }}</h5>
                <h6 class="card-subtitle text-muted my-2">{{ "{$author} ( {$publisher} )" }}</h5>
                <div class="mb-3">
                    <p class="card-text my-0"><small class="text-muted">Rental Times: {{ $rentalTimes }}</small></p>
                    <p class="card-text my-0"><small class="text-muted">Return Date: {{ $returnDate }}</small></p>
                </div>
                @if (isset($is_detail))
                    <p class="card-text mb-3">{{ $bookDescription }}</p>
                @endif
                <div class="btn-group w-100">
                    <button type="button"
                        id="modal-btn"
                        class="btn btn-outline-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-form"
                        data-bs-book-id="{{ $bookId }}"
                        data-bs-book-title="{{ $bookTitle }}"
                        {{ $isBorrowed || !$isRentable ? 'disabled' : '' }}>
                        {{ $isBorrowed ? 'Borrowed' : ($isRentable ? 'Rental' : 'Rent Out') }}
                    </button>
                    @unless (isset($is_detail))
                        <a href="{{ route('books.detail', ['bookId' => $bookId]) }}" type="button" class="btn btn-outline-primary">Detail</a>
                    @endunless
                </div>
            </div>
        </div>
    </div>
</div>

@section('modal')
    <x-modal title='Rental Form' id='modal-form' idBtnNegative='modal-form-btn-negative'>
        <form>
            <div class="mb-3">
                <label for="modal-form-user-name" class="col-form-label">User:</label>
                <input type="text" class="form-control" id="modal-form-user-name" value="{{ $userName }}" readonly>
            </div>
            <div class="mb-3">
                <label for="modal-form-book-title" class="col-form-label">Title:</label>
                <input type="text" class="form-control" id="modal-form-book-title" value="" readonly>
                <input type="hidden" id="modal-form-book-id" value="">
            </div>
            <div class="mb-3">
                <label for="modal-form-return-date" class="col-form-label">Return Plan Date:</label>
                <input type="date" class="form-control" id="modal-form-return-date" min="{{ \Carbon\Carbon::tomorrow()->format('Y-m-d') }}" value="{{ \Carbon\Carbon::tomorrow()->format('Y-m-d') }}">
            </div>
        </form>
        <x-slot:btnPositive>
            <button type="button"
                id="modal-form-btn-positive"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modal-confirm"
                data-bs-dismiss="modal">Confirm</button>
        </x-slot:btnPositive>
    </x-modal>
    <x-modal title='Rental Confirm' id='modal-confirm' idBtnNegative='modal-confirm-btn-negative' idBtnPositive='modal-confirm-btn-positive'>
        <form method="POST" action="{{ route('rentals.create.create') }}">
            @csrf
            <div class="mb-3">
                <label for="recipient-name" class="col-form-label">User:</label>
                <input type="text" class="form-control form-control-plaintext" id="modal-user-name" name="modal-user-name" value="{{ $userName }}" readonly>
                <input type="hidden" id="modal-user-id" name="modal-user-id" value="{{ $userId }}">
            </div>
            <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Title:</label>
                <input type="text" class="form-control form-control-plaintext" id="modal-book-title" name="modal-book-title" value="" readonly>
                <input type="hidden" id="modal-book-id" name="modal-book-id" value="">
            </div>
            <div class="mb-3">
                <label for="modal-return-date" class="col-form-label">Return Plan Date:</label>
                <input type="date" class="form-control form-control-plaintext" id="modal-return-date" name="modal-return-date" min="{{ \Carbon\Carbon::tomorrow()->format('Y-m-d') }}" value="" readonly>
            </div>
        </form>
    </x-modal>
@endsection

@section('modal-script')
    <script>
        const modal_form = document.getElementById('modal-form')
        const modal_confirm = document.getElementById('modal-confirm')
        const btnPositive = modal_confirm.querySelector('#modal-confirm-btn-positive')
        const btnNegative = modal_confirm.querySelector('#modal-confirm-btn-negative')
        btnPositive.addEventListener('click', () => {
            modal_confirm.querySelector('.modal-body form').submit()
            btnNegative.setAttribute('disabled', true)
            btnPositive.setAttribute('disabled', true)
        })
        modal_form.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget
            modal_form.querySelector('#modal-form-book-id').value = button.getAttribute('data-bs-book-id')
            modal_form.querySelector('#modal-form-book-title').value = button.getAttribute('data-bs-book-title')
        })
        modal_confirm.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget
            modal_confirm.querySelector('#modal-book-id').value = modal_form.querySelector('#modal-form-book-id').value
            modal_confirm.querySelector('#modal-book-title').value = modal_form.querySelector('#modal-form-book-title').value
            modal_confirm.querySelector('#modal-return-date').value = modal_form.querySelector('#modal-form-return-date').value
        })
    </script>
@endsection
