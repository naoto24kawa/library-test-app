/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { useForm } from '@inertiajs/react'
import { Button, ButtonGroup, TextField } from '@mui/material'
import { dayjs, Dayjs, Unit } from '../../js/helper/dayjs'
import { DefaultModal } from './DefaultModal'
import useModal from '../../js/hooks/useModal'
import { ModalTypeEnum } from '../../js/states/modal'
import DatePicker from './DatePicker'

type Props = {
  user: User
  book: Book
}

type FormData = {
  book: Book
  user: User
  returnDate: Dayjs | null
}

const RentalFormComponent: React.FunctionComponent<Props> = ({
  user,
  book,
}) => {
  const [, setIsOpen] = useModal(ModalTypeEnum.rental)

  const { data, setData, post, processing, errors } = useForm<FormData>({
    user: user,
    book: book,
    returnDate: dayjs().add(2, Unit.week),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post(`/rentals/create?framework=react`)
    setIsOpen(false)
  }

  return (
    <DefaultModal type="rental">
      <div
        className="container"
        css={css`
          max-width: 600px;
        `}
      >
        <h1>Rental</h1>
        <form className="m-auto" onSubmit={handleSubmit}>
          <TextField
            type="text"
            className="form-control"
            inputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={data.user.name}
            label="User"
            fullWidth
          />
          <TextField
            type="text"
            className="form-control"
            inputProps={{
              readOnly: true,
            }}
            variant="filled"
            value={data.book.title}
            label="Title"
            fullWidth
          />
          <DatePicker
            className="form-control"
            label="Return Date"
            format="YYYY-MM-DD"
            value={data.returnDate}
            onChange={(newValue) => setData('returnDate', newValue)}
            disabled={processing}
            slots={{
              textField: (params) => (
                <TextField {...params} variant="filled" fullWidth />
              ),
            }}
          />
          <div className="row my-2">
            <ButtonGroup fullWidth>
              <Button
                variant="outlined"
                onClick={() => setIsOpen(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={processing}
              >
                Confirm
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    </DefaultModal>
  )
}

export default RentalFormComponent

{
  /* <Modal title="Rental Confirm" id="modal-confirm">
        <Box>
          <form method="POST" action="{{ route('rentals.create.create') }}">
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-htmlForm-label">
                User:
              </label>
              <input
                type="text"
                className="htmlForm-control htmlForm-control-plaintext"
                id="modal-user-name"
                name="modal-user-name"
                value="{{ $userName }}"
              />
              <input
                type="hidden"
                id="modal-user-id"
                name="modal-user-id"
                value="{{ $userId }}"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-htmlForm-label">
                Title:
              </label>
              <input
                type="text"
                className="htmlForm-control htmlForm-control-plaintext"
                id="modal-book-title"
                name="modal-book-title"
                value=""
                readOnly
              />
              <input
                type="hidden"
                id="modal-book-id"
                name="modal-book-id"
                value=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="modal-return-date" className="col-htmlForm-label">
                Return Plan Date:
              </label>
              <input
                type="date"
                className="htmlForm-control htmlForm-control-plaintext"
                id="modal-return-date"
                name="modal-return-date"
                min="{{ \Carbon\Carbon::tomorrow()->htmlFormat('Y-m-d') }}"
                value=""
                readOnly
              />
            </div>
          </form>
        </Box>
      </Modal> */
}
