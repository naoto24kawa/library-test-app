/** @jsx css, jsx */
/** @jsxFrag css, jsx */
import { css } from '@emotion/react'
import { Link } from '@inertiajs/react'
import React from 'react'
import { dayjs } from 'resources/js/helper/dayjs'
import RentalFormComponent from './RentalFormComponent'
import useModal from '../../js/hooks/useModal'
import { ModalTypeEnum } from '../../js/states/modal'
import { ButtonGroup, Button } from '@mui/material'

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
  const returnDate = dayjs.min(
    book.in_progress?.map((user) => dayjs(user.pivot?.end_date)) ?? []
  )
  const isRentable = (book.amount ?? 0) > (book.in_progress?.length ?? 0)
  const isBorrowed = user.in_progress?.map((book) => book.id).includes(book.id)

  const [, setIsOpen] = useModal(ModalTypeEnum.rental)

  return (
    <>
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
              <ButtonGroup fullWidth>
                {!isDetail && (
                  <Button href={`/react/books/${book.id}`} variant="outlined">
                    Detail
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => setIsOpen(true)}
                  disabled={isBorrowed || !isRentable}
                >
                  {isBorrowed ? 'Borrowed' : isRentable ? 'Rental' : 'Rent Out'}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
      <RentalFormComponent user={user} book={book} />
    </>
  )
}

export default BookCardComponent
