/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import BookCardComponent from '../components/BookCardComponent'
import { useForm } from '@inertiajs/react'
import Layout from '../layouts/Layout'
import { TextField, ButtonGroup, Button } from '@mui/material'

type Props = {
  user: User
  book: Book
  comments?: Comment[]
}

const BookDetailPage: React.FunctionComponent<Props> = ({
  user,
  book,
  comments,
}) => {
  const { data, setData, post, processing, errors } = useForm({
    content: '',
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
    post(`/comments/books/${book.id}?framework=react`)
  }

  return (
    <Layout>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row mb-2">
            <div className="col-lg-6 col-md-12">
              <h4>About</h4>
              <BookCardComponent user={user} book={book} isDetail={true} />
            </div>
            <div className="col-lg-6 col-md-12">
              <h4>Comments</h4>
              <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                  <TextField
                    onChange={handleChange}
                    value={data.content}
                    name="content"
                    className="form-control"
                    variant="filled"
                    multiline
                  />
                  <ButtonGroup>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      css={css`
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                      `}
                      disabled={processing}
                    >
                      Submit
                    </Button>
                  </ButtonGroup>
                </div>
              </form>
              <div className="list-group">
                {comments?.map((comment) => {
                  return (
                    <div
                      className="list-group-item"
                      aria-current="true"
                      key={comment.id}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="me-auto">
                          <small>{comment.created_user.name}</small>
                          <p className="my-1">{comment.content}</p>
                          <small>{comment.created_at}</small>
                        </div>
                        {/* 削除ボタンロジックは後回し */}
                        {/* @if (Auth::id() == $comment->createdUser->id)
                        <form action="{{ route('comments.delete.book', ['bookId' => $book->id]) }}"
                            method="post">
                            {{-- TODO: CSRFトークンが大量に生成されるのでフォームを統一したい --}}
                            @csrf
                            {{-- TODO: 以下、利用しないようにする->URL変更 --}}
                            @method('DELETE')
                            <input type="hidden" name="commentId" value="{{ $comment->id }}">
                            <button type="submit" className="btn btn-link p-0 ms-2">
                                <i className = "bi bi-trash"></i>
                            </button>
                        </form>
                    @endif */}
                      </div>
                      {comment?.children && (
                        <div className="list-group mt-2">
                          {comment?.children.map((child) => {
                            return (
                              <div
                                key={child.id}
                                className="list-group-item"
                                aria-current="true"
                              >
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="me-auto">
                                    <small>{child.created_user.name}</small>
                                    <p className="my-1">{child.content}</p>
                                    <small>{child.created_at}</small>
                                  </div>
                                  {/* @if (Auth::id() == $branch->createdUser->id)
                                            <form
                                                action="{{ route('comments.delete.book', ['bookId' => $book->id]) }}"
                                                method="post">
                                                <input type="hidden" name="commentId"
                                                    value="{{ $branch->id }}">
                                                <input type="hidden" id="comment-id" name="comment-id"
                                                    value="{{ $branch->id }}">
                                                <button type="submit" className="btn btn-link p-0 ms-2">
                                                    <i className = "bi bi-trash"></i>
                                                </button>
                                            </form>
                                        @endif */}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BookDetailPage
