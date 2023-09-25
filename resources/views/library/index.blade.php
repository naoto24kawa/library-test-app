@extends('layouts.app')

@push('styles')
    @vite('css/library.css')
@endpush

@php
    $user = Auth::user();
@endphp

@section('child')
    <div class="album py-5 bg-body-tertiary">
        <div class="container">
            {{ $books->links() }}
            <div class="row mb-2">
                @foreach ($books as $book)
                    <div class="col-lg-6 col-md-12">
                        <x-book-card :user="$user" :book="$book"></x-book-card>
                    </div>
                @endforeach
            </div>
            {{ $books->links() }}
        </div>
    </div>

    @yield('modal')

@endsection

@push('scripts')
    @yield('modal-script')
@endpush
