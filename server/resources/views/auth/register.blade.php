<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(["resources/js/app.js"])
    @vite(["resources/css/register.css"])
</head>
<body class="d-flex align-items-center py-4 bg-body-tertiary">
    <main class="form-signin w-100 m-auto">
        <form method="POST" action="{{ route('register') }}">
            @csrf

            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

            <!-- Name -->
            <div class="form-floating">
                <input id="name" class="form-control" type="text" name="name" style="margin-bottom: -1px; border-bottom-left-radius: 0;" required placeholder="Name">
                <label for="name">Name</label>
                <x-input-error :messages="$errors->get('name')" />
            </div>

            <!-- Email Address -->
            <div class="form-floating">
                <input id="email" class="form-control" type="email" name="email" style="margin-bottom: -1px; border-radius: 0;" required placeholder="Email Address">
                <label for="email">Email Address</label>
                <x-input-error :messages="$errors->get('email')" />
            </div>

            <!-- Password -->
            <div class="form-floating">
                <input id="password" class="form-control" type="password" name="password" style="margin-bottom: -1px; border-radius: 0;" required placeholder="Password">
                <label for="password">Password</label>
                <x-input-error :messages="$errors->get('password')" />
            </div>

            <!-- Confirm Password -->
            <div class="form-floating" style="margin-bottom: 24px;">
                <input id="password_confirmation" class="form-control" type="password" name="password_confirmation" style="border-top-right-radius: 0; border-top-left-radius: 0;" required placeholder="Confirm Password">
                <label for="password_confirmation">Confirm Password</label>
                <x-input-error :messages="$errors->get('password_confirmation')" />
            </div>

            <div class="flex items-center justify-end">
                <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('login') }}">
                    {{ __('Already registered?') }}
                </a>

                <x-primary-button class="ml-4">
                    {{ __('Register') }}
                </x-primary-button>
            </div>
        </form>
    </main>

</body>
</html>

