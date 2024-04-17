/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'
import { Button, ButtonGroup } from '@mui/material'
import Layout from '../layouts/Layout'
import ReturnFormComponent from '../components/ReturnFormComponent'
import { dayjs, Format } from 'resources/js/helper/dayjs'
import useModal from '../../js/hooks/useModal'
import { ModalTypeEnum } from '../../js/states/modal'

type Props = {
  user: User
  books: Book[]
}

const MyPage: React.FunctionComponent<Props> = ({ user, books }) => {
  const [, setIsOpen] = useModal(ModalTypeEnum.return)
  return (
    <Layout>
      <div
        className="container py-4"
        css={css`
          max-width: 600px;
        `}
      >
        <div className="row">
          <h4>Progress</h4>
        </div>
        <div className="list-group">
          {books.map((book) => (
            <div
              key={book.id}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between my-3">
                <div
                  className="mb-1"
                  css={css`
                    font-size: 1.125rem;
                  `}
                >
                  <h5 className="mb-0">{book.title}</h5>
                  <small className="fs-6">{book.author?.name}</small>
                  <small className="fs-6">{book.publisher?.name}</small>
                </div>
                <small>
                  {`period: ${dayjs(book.rental_history?.end_date).format(
                    Format.standard
                  )}`}
                </small>
              </div>
              <form action="" method="post">
                <ButtonGroup fullWidth>
                  <Button variant="contained" onClick={() => setIsOpen(true)}>
                    Return
                  </Button>
                  <Button href={`/react/books/${book.id}`} variant="contained">
                    Detail
                  </Button>
                </ButtonGroup>
              </form>
              <ReturnFormComponent user={user} book={book} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default MyPage

// <x-modal title="本当に返却しますか？" labelBtnPositive="Return">
//     <form method="POST" action="{{ route('rentals.update.update') }}">
//         @csrf
//         <input type="hidden" id="modal-user-id" name="modal-user-id" value="{{ Auth::user()->id }}">
//         <input type="hidden" id="modal-book-id" name="modal-book-id" value="">
//         <label for="modal-book-title" className="col-form-label">Title:</label>
//         <input type="text" className="form-control form-control-plaintext" id="modal-book-title" name="modal-book-title" readonly>
//         <label for="modal-book-period" className="col-form-label">Period:</label>
//         <input type="text" className="form-control form-control-plaintext" id="modal-book-period" name="modal-book-period" readonly>
//     </form>
// </x-modal>
