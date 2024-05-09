import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

type Props = {
  user: User
  books: {
    data: Book[]
  }
}

const UserDetailPage: React.FunctionComponent<Props> = ({ user, books }) => {
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row">
          <h4>Progress</h4>
        </div>
        <div className="list-group">
          {books.data.map((book) => (
            <div
              className="list-group-item list-group-item-action"
              key={book.id}
            >
              <div className="d-flex w-100 justify-content-between my-3">
                <div
                  className="mb-1"
                  css={css`
                    font-size: 1.125rem;
                  `}
                >
                  <h5 className="mb-0">{book.title}</h5>
                  <small className="fs-6">
                    {book.author ? book.author.name : 'Undefined'}
                  </small>
                  <small className="fs-6">
                    {book.publisher ? book.publisher.name : 'Undefined'}
                  </small>
                </div>
                {/* <small>period: { book->earliestReturnDate() }</small> */}
              </div>
              {/* {{-- <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small>And some small print.</small> --}} */}
              <form action="" method="post">
                <div className="btn-group w-100">
                  <button
                    type="button"
                    id="modal-btn"
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                    data-bs-book-id="{{ $book->id }}"
                    data-bs-book-title="{{ $book->title }}"
                    data-bs-book-period="{{ $book->earliestReturnDate() }}"
                  >
                    Return
                  </button>
                  <a
                    href="{{ route('books.detail', ['bookId' => $book->id]) }}"
                    type="button"
                    className="btn btn-outline-primary"
                  >
                    Detail
                  </a>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage

//     <x-modal title="本当に返却しますか？" labelBtnPositive="Return">
//         <form method="POST" action="{{ route('rentals.update.update') }}">
//             @csrf
//             <input type="hidden" id="modal-user-id" name="modal-user-id" value="{{ Auth::user()->id }}">
//             <input type="hidden" id="modal-book-id" name="modal-book-id" value="">
//             <label for="modal-book-title" className="col-form-label">Title:</label>
//             <input type="text" className="form-control form-control-plaintext" id="modal-book-title" name="modal-book-title" readonly>
//             <label for="modal-book-period" className="col-form-label">Period:</label>
//             <input type="text" className="form-control form-control-plaintext" id="modal-book-period" name="modal-book-period" readonly>
//         </form>
//     </x-modal>
// @endsection

// @push('scripts')
//     <script>
//         const modal = document.getElementById('modal')
//         const btn = modal.querySelector('#btnPositive')
//         btn.addEventListener('click', () => {
//             modal.querySelector('.modal-body form').submit()
//         })
//         modal.addEventListener('show.bs.modal', (event) => {
//             const button = event.relatedTarget
//             modal.querySelector('#modal-book-id').value = button.getAttribute('data-bs-book-id')
//             modal.querySelector('#modal-book-title').value = button.getAttribute('data-bs-book-title')
//             modal.querySelector('#modal-book-period').value = button.getAttribute('data-bs-book-period')
//         })
//     </script>
// @endpush
