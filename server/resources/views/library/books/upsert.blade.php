@extends('layouts.app')

@push('styles')
    {{-- nothing --}}
@endpush

@section('child')
    <div class="py-5 bg-body-tertiary">
        <div class="container">
            <form method="POST" action="{{ route('books.create.upsert') }}" enctype="multipart/form-data" class="m-auto" style="max-width: 600px">
                @csrf
                <h4 class="mb-3">Library Register</h4>
                @if (session('feedback.success'))
                <p style="color: green;">{{ session('feedback.success') }}</p>
                @endif
                <label class="mb-1">Detail</label>
                <input id="book_id" name="book_id" type="hidden" value="{{ $book->id ?? null }}">
                {{-- Title --}}
                <div class="form-floating">
                    <input id="title" name="title" type="text" class="form-control" placeholder="Title" style="border-bottom-left-radius: 0; border-bottom-right-radius: 0;" value="{{ $book->title ?? null }}">
                    <label for="title" class="">Title<small class="text-danger ms-1">Required</small></label>
                    <x-input-error :messages="$errors->get('title')" class="mt-2" style="color:red;" />
                </div>
                {{-- Author --}}
                <div class="form-floating">
                    <input id="author" name="author" type="text" class="form-control typeahead" placeholder="Ahthor" style="border-radius: 0;" value="{{ $book->author?->name ?? null }}">
                    <label for="author">Author</label>
                </div>
                {{-- Publisher --}}
                <div class="form-floating">
                    <input id="publisher" name="publisher" type="text" class="form-control typeahead" placeholder="Publisher" style="border-radius: 0;" value="{{ $book->publisher?->name ?? null }}">
                    <label for="publisher">Publisher</label>
                </div>
                {{-- Description --}}
                <div class="form-floating">
                    <textarea id="description" name="description" type="text" class="form-control" style="height: 120px; border-radius: 0;" placeholder="Description">{{ $book->description ?? null }}</textarea>
                    <label for="description" class="">Description</label>
                    <x-input-error :messages="$errors->get('description')" class="mt-2" />
                </div>
                {{-- Amount --}}
                <div class="form-floating">
                    <input id="amount" name="amount" type="number" class="form-control" style="border-top-left-radius: 0; border-top-right-radius: 0;" pattern="^[0-9]+$" value="{{ $book->amount ?? 1 }}">
                    <label for="amount" class="">Amount<small class="text-danger ms-1">Required</small></label>
                    <x-input-error :messages="$errors->get('amount')" class="mt-2" />
                </div>
                {{-- Image --}}
                <div class="my-2">
                    <label for="cover" class="form-label">Book Cover Image</label>
                    <input type="file" id="cover" name="cover" class="form-control">
                    <label for="preview" id="previewLabel" class="my-2" style="display: none;">Uploaded Image Preview</label>
                    <img id="preview" src="#" alt="your image" class="w-100" style="display:none; object-fit: cover; object-position: center;"/>
                </div>
                <button type="submit" class="btn btn-outline-primary w-100">Register</button>
            </form>

        </div>
    </div>
@endsection

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
    <script>
        // Image Preview
        cover.onchange = evt => {
            preview = document.getElementById('preview');
            preview.style.display = 'block';
            previewLabel.style.display = 'block';
            const [file] = cover.files
            if (file) {
                preview.src = URL.createObjectURL(file)
            }
        }
    </script>
    <script>
        const option = {
            autoSelect: false,
            minLength: -1, // 空文字でも検索できるように
            items: 'all',
        }

        // Author Autocomplete
        $author = $('#author');
        const authors_autocomplete = "{{ route('authors.autocomplete') }}";
        $author.typeahead({
            ...option,
            source: (query, process) => $.get(authors_autocomplete, { query: query }, (data) => process(data)),
        });
        $author.on('click', () => $author.typeahead('lookup'));

        // Publisher Autocomplete 
        $publisher = $('#publisher');
        const publishers_autocomplete = "{{ route('publishers.autocomplete') }}";
        $publisher.typeahead({
            ...option,
            source: (query, process) => $.get(publishers_autocomplete, { query: query }, (data) => process(data)),
        });
        $publisher.on('click', () => $publisher.typeahead('lookup'));
    </script>
@endpush
