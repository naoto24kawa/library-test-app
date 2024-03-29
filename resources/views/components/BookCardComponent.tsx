/** @jsx css, jsx */
/** @jsxFrag css, jsx */
import { css } from '@emotion/react'
import { Link } from '@inertiajs/react'
import React from 'react'
import dayjs from 'resources/js/helper/dayjs'

type Props = {
  user: User
  book: Book
  isDetail?: boolean
}

const BookCardComponent: React.FunctionComponent<Props> = ({
  user,
  book,
  isDetail = false,
}) => {
  console.log(user)
  console.log(book)
  const returnDate = dayjs.min(
    book.in_progress?.map((user) => dayjs(user.pivot?.end_date)) ?? []
  )
  const isRentable = (book.amount ?? 0) > (book.in_progress?.length ?? 0)
  const isBorrowed = user.in_progress?.map((book) => book.id).includes(book.id)
  return (
    <div className="card shadow-sm mb-1">
      <div className="row">
        <div className="col-4">
          {book?.img_path ? (
            <img
              src={`/storage/images/books/${book.img_path}`}
              className="card-img h-100"
              css={css`
                objectFit: 'cover'
                objectPosition: 'center'
                borderBottomRightRadius: 0
                borderTopRightRadius: 0`}
              alt="{ bookTitle }"
            />
          ) : (
            <svg
              className="bd-placeholder-img card-img w-100 h-100"
              css={css`
              borderBottomRightRadius: 0
              borderTopRightRadius: 0`}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Thumbnail"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c" />
              <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                {book.title}
              </text>
            </svg>
          )}
        </div>
        <div className="col-8">
          <div className="card-body h-100">
            <div className="d-flex mb-2">
              <h5 className="card-title me-auto">{book.title}</h5>
              <Link
                href={`/react/books/update/${book.id}`}
                className="btn btn-link p-0"
                css={css`
                  border: 0;
                `}
              >
                <i className="bi bi-pencil"></i>
              </Link>
            </div>
            <h6 className="card-subtitle text-muted my-2">{`${book.author?.name} ( ${book.publisher?.name} )`}</h6>
            <div className="mb-3">
              <p className="card-text my-0">
                <small className="text-muted">
                  Rental Times: {book.users_count ?? 0}
                </small>
              </p>
              <p className="card-text my-0">
                <small className="text-muted">
                  {`Return Date: 
                  ${isRentable ? 'Available' : returnDate ? returnDate.format('YYYY-MM-DD') : ''}`}
                </small>
              </p>
            </div>
            {isDetail ? (
              <p className="card-text mb-3">{book.description}</p>
            ) : (
              ''
            )}
            <div className="btn-group w-100">
              <button
                type="button"
                id="modal-btn"
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#modal-form"
                data-bs-book-id={book.id}
                data-bs-book-title={book.title}
                disabled={isBorrowed || !isRentable}
              >
                {isBorrowed ? 'Borrowed' : isRentable ? 'Rental' : 'Rent Out'}
              </button>
              {!isDetail ? (
                <Link
                  href={`/react/books/${book.id}`}
                  type="button"
                  className="btn btn-outline-primary"
                >
                  Detail
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCardComponent

// TODO: react-modalに置き換える
{
  /* @section('modal')
    <x-modal title='Rental Form' id='modal-form' idBtnNegative='modal-form-btn-negative'>
        <form>
            <div className="mb-3">
                <label for="modal-form-user-name" className="col-form-label">User:</label>
                <input type="text" className="form-control" id="modal-form-user-name" value="{ userName }" readonly>
            </div>
            <div className="mb-3">
                <label for="modal-form-book-title" className="col-form-label">Title:</label>
                <input type="text" className="form-control" id="modal-form-book-title" value="" readonly>
                <input type="hidden" id="modal-form-book-id" value="">
            </div>
            <div className="mb-3">
                <label for="modal-form-return-date" className="col-form-label">Return Plan Date:</label>
                <input type="date" className="form-control" id="modal-form-return-date"
                    min="{ \Carbon\Carbon::tomorrow()->format('Y-m-d') }"
                    value="{ \Carbon\Carbon::tomorrow()->format('Y-m-d') }">
            </div>
        </form>
        <x-slot:btnPositive>
            <button type="button" id="modal-form-btn-positive" className="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#modal-confirm" data-bs-dismiss="modal">Confirm</button>
        </x-slot:btnPositive>
    </x-modal>
    <x-modal title='Rental Confirm' id='modal-confirm' idBtnNegative='modal-confirm-btn-negative'
        idBtnPositive='modal-confirm-btn-positive'>
        <form method="POST" action="{ route('rentals.create.create') }">
            @csrf
            <div className="mb-3">
                <label for="recipient-name" className="col-form-label">User:</label>
                <input type="text" className="form-control form-control-plaintext" id="modal-user-name"
                    name="modal-user-name" value="{ userName }" readonly>
                <input type="hidden" id="modal-user-id" name="modal-user-id" value="{ userId }">
            </div>
            <div className="mb-3">
                <label for="recipient-name" className="col-form-label">Title:</label>
                <input type="text" className="form-control form-control-plaintext" id="modal-book-title"
                    name="modal-book-title" value="" readonly>
                <input type="hidden" id="modal-book-id" name="modal-book-id" value="">
            </div>
            <div className="mb-3">
                <label for="modal-return-date" className="col-form-label">Return Plan Date:</label>
                <input type="date" className="form-control form-control-plaintext" id="modal-return-date"
                    name="modal-return-date" min="{ \Carbon\Carbon::tomorrow()->format('Y-m-d') }" value=""
                    readonly>
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
            modal_confirm.querySelector('#modal-book-id').value = modal_form.querySelector('#modal-form-book-id')
                .value
            modal_confirm.querySelector('#modal-book-title').value = modal_form.querySelector(
                '#modal-form-book-title').value
            modal_confirm.querySelector('#modal-return-date').value = modal_form.querySelector(
                '#modal-form-return-date').value
        })
    </script>
@endsection */
}
