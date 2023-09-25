<button {{ $attributes->merge(['type' => 'submit', 'class' => 'btn btn-primary w-100 py-2']) }}>
    {{ $slot }}
</button>
