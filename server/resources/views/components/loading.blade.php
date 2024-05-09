<div id="loading"
    {{ $attributes->merge(['class' => 'position-absolute top-0 start-0 w-100 h-100', 'style' => 'background: rgba(0, 0, 0, .5); z-index: 10000;']) }}>
    <div class="text-center position-absolute top-50 start-50 w-100 translate-middle">
        <div class="spinner-border text-light" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
</div>
