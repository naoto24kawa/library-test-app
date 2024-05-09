@props([
    'title' => '',
    'id' => 'modal',
    'btnNegative',
    'idBtnNegative' => 'btnNegative',
    'labelBtnNegative' => 'Close',
    'btnPositive',
    'idBtnPositive' => 'btnPositive',
    'labelBtnPositive' => 'OK',
])

{{-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button> --}}

<div class="modal fade" id="{{ $id }}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">{{ $title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                {{ $slot }}

            </div>
            <div class="modal-footer">
                @if (isset($btnNegative))
                    {{ $btnNegative }}
                @else
                    <button type="button" id="{{ $idBtnNegative }}" class="btn btn-secondary" data-bs-dismiss="modal">{{ $labelBtnNegative }}</button>
                @endif
                @if (isset($btnPositive))
                    {{ $btnPositive }}
                @else
                    <button type="button" id="{{ $idBtnPositive }}" class="btn btn-primary">{{ $labelBtnPositive }}</button>
                @endif
            </div>
        </div>
    </div>
</div>

@push('scripts')
    {{-- nothing --}}
@endpush