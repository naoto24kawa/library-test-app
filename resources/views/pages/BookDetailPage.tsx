/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import BookCardComponent from '../components/BookCardComponent'
import { useForm } from '@inertiajs/react'
import Layout from '../layouts/Layout'

type Props = {
  user: User
  book: Book
}

const BookDetailPage: React.FunctionComponent<Props> = ({ user, book }) => {
  const { data, setData, post, processing, errors } = useForm({
    content: '',
  })

  function handleChange(e) {
    const key = e.target.id
    const value = e.target.value
    setData((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    post('/react/rentals/create')
  }

  console.log(book)

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
                  <textarea
                    onChange={handleChange}
                    value={data.content}
                    id="form-comment"
                    name="form-comment"
                    className="form-control"
                    css={css`
                      formsizing: content;
                    `}
                    placeholder="comment something"
                  ></textarea>
                  <button
                    type="submit"
                    id="form-comment-btn"
                    className="btn btn-outline-primary"
                    disabled={processing}
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="list-group">
                {book.comments?.map((comment) => {
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
                      {/* @if ($comment->hasDescendants())
                        <div className="list-group mt-2">
                            @foreach ($comment->getDescendants() as $branch)
                                <div className="list-group-item" aria-current="true">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="me-auto">
                                            <small>{{ $branch->createdUser->name }}</small>
                                            <p className="my-1">{{ $branch->content }}</p>
                                            <small>{{ $branch->created_at }}</small>
                                        </div>
                                        @if (Auth::id() == $branch->createdUser->id)
                                            <form
                                                action="{{ route('comments.delete.book', ['bookId' => $book->id]) }}"
                                                method="post">
                                                {{-- TODO: CSRFトークンが大量に生成されるのでフォームを統一したい --}}
                                                @csrf
                                                {{-- TODO: 以下、利用しないようにする->URL変更 --}}
                                                @method('DELETE')
                                                <input type="hidden" name="commentId"
                                                    value="{{ $branch->id }}">
                                                <input type="hidden" id="comment-id" name="comment-id"
                                                    value="{{ $branch->id }}">
                                                <button type="submit" className="btn btn-link p-0 ms-2">
                                                    <i className = "bi bi-trash"></i>
                                                </button>
                                            </form>
                                        @endif
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endif */}
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

{
  /* <script>
        const formCommentBtn = document.getElementById('form-comment-btn')
        formCommentBtn.addEventListener('click', () => {
            // formCommentBtn.setAttribute('disabled', true) // TODO: double submitを止めたいがsubmitすら止まってしまう
        })
    </script> */
}

export default BookDetailPage
