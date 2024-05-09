/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/react'
import { useForm } from '@inertiajs/react'
import Layout from '../layouts/Layout'
import { Button, ButtonGroup, TextField } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import {
  AuthorAutoComplete,
  AuthorAutoCompleteProps,
} from '../components/AuthorAutoComplete'
import {
  PublisherAutoComplete,
  PublisherAutoCompleteProps,
} from '../components/PublisherAutoComplete'

type Props = {
  user: User
  book?: Book
  authors: Author[]
  publishers: Publisher[]
}

type FormData = {
  id?: number
  title?: string
  author?: Author
  publisher?: Publisher
  description?: string
  amount?: number
  cover?: File
  user: User
}

const BooksUpdatePage: React.FunctionComponent<Props> = ({
  user,
  book,
  authors,
  publishers,
}) => {
  const { data, setData, post, processing, errors } = useForm<FormData>({
    id: book?.id,
    title: book?.title,
    author: { ...book?.author } as Author,
    publisher: { ...book?.publisher } as Publisher,
    description: book?.description,
    amount: book?.amount ?? 1,
    user: { ...user },
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name
    const value = e.target.value
    setData((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post(`/books/${book?.id ? `update/${book.id}` : `create`}?framework=react`)
  }

  const [file, setFile] = useState<File | undefined>(undefined)
  const [preview, setPreview] = useState<boolean>(false)
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined)

  //メモリ内のBLOBにアクセスするためのURL生成
  useEffect(() => {
    if (file) {
      setPreviewSrc(URL.createObjectURL(file))
      setPreview(true)
    }
  }, [file])

  console.log(data)
  console.log(errors)

  return (
    <Layout>
      <div className="py-5 bg-body-tertiary">
        <div className="container">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="m-auto"
            css={css`
              max-width: 600px;
            `}
          >
            <h4 className="mb-3">Library Register</h4>
            <label className="mb-1">Detail</label>
            {/* {{-- Title --}} */}
            <TextField
              name="title"
              type="text"
              className="form-control"
              variant="filled"
              label="Title"
              value={data.title ?? ''}
              onChange={handleChange}
              disabled={processing}
              fullWidth
              required
            />
            {/* {{-- Author --}} */}
            <AuthorAutoComplete
              className="form-control p-0"
              authors={authors}
              value={{
                inputValue: data.author?.name,
                name: data.author?.name,
                id: data.author?.id,
              }}
              onChange={
                ((newValue) => {
                  setData((values) => ({
                    ...values,
                    author: {
                      id: newValue?.id,
                      name: newValue?.name || newValue?.inputValue,
                    } as Author,
                  }))
                }) as AuthorAutoCompleteProps['onChange']
              }
              disabled={processing}
            />
            {/* {{-- Publisher --}} */}
            <PublisherAutoComplete
              className="form-control p-0"
              publishers={publishers}
              value={{
                inputValue: data.publisher?.name,
                name: data.publisher?.name,
              }}
              onChange={
                ((newValue) => {
                  setData((values) => ({
                    ...values,
                    publisher: {
                      id: newValue?.id,
                      name: newValue?.name || newValue?.inputValue,
                    } as Publisher,
                  }))
                }) as PublisherAutoCompleteProps['onChange']
              }
              disabled={processing}
            />
            {/* {{-- Description --}} */}
            <TextField
              name="description"
              className="form-control"
              variant="filled"
              label="Description"
              value={data.description ?? ''}
              onChange={handleChange}
              disabled={processing}
              fullWidth
              multiline
            />
            {/* {{-- Amount --}} */}
            <TextField
              name="amount"
              type="number"
              className="form-control"
              variant="filled"
              value={data?.amount}
              onChange={handleChange}
              label="Amount"
              required
              InputProps={{ inputProps: { min: 0 } }}
              disabled={processing}
              fullWidth
            />
            {/* {{-- Image --}} */}
            <MuiFileInput
              className="form-control"
              value={data.cover}
              inputProps={{ accept: '.png, .jpeg' }}
              variant="filled"
              hideSizeText
              onChange={(newFile) => {
                if (newFile) {
                  setFile(newFile)
                  setData('cover', newFile)
                }
              }}
              label="Cover Image"
              disabled={processing}
            />
            <div
              className="row w-100 m-0"
              css={css`
                display: ${preview ? '' : 'none'};
              `}
            >
              {book?.img_path && (
                <div className="col p-0">
                  変更前
                  <img
                    className="form-control p-0"
                    src={`/storage/images/books/${book.img_path}`}
                  />
                </div>
              )}
              <div className="col p-0">
                変更後
                <img className="form-control p-0" src={previewSrc} />
              </div>
            </div>
            <div className="row my-2">
              <ButtonGroup>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={processing}
                  fullWidth
                >
                  Register
                </Button>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default BooksUpdatePage
