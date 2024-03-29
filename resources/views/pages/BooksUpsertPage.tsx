/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'
import { useForm } from '@inertiajs/react'
import PrimaryButtonComponent from '../components/PrimaryButtonComponent'
import Layout from '../layouts/Layout'

type Props = {
  user: User
  book?: Book
}

const BooksUpsertPage: React.FunctionComponent<Props> = ({ user, book }) => {
  const { data, setData, post, processing, errors } = useForm({
    book_id: book?.id,
    title: book?.title,
    author_id: book?.author?.id,
    publisher_id: book?.publisher?.id,
    description: book?.description,
    amount: book?.amount,
    image_path: book?.img_path,
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
    post('/books/upsert')
  }

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
            {/* @if (session('feedback.success'))
                <p css={css`color: green;`}>{ session('feedback.success') }</p>
                @endif */}
            <label className="mb-1">Detail</label>
            <input
              id="book_id"
              name="book_id"
              type="hidden"
              value={data.book_id}
              onChange={handleChange}
            />
            {/* {{-- Title --}} */}
            <div className="form-floating">
              <input
                id="title"
                name="title"
                type="text"
                className="form-control"
                placeholder="Title"
                css={css`
                  border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
                `}
                value={data.title}
                onChange={handleChange}
              />
              <label htmlFor="title" className="">
                Title<small className="text-danger ms-1">Required</small>
              </label>
              {/* <x-input-error :messages="$errors->get('title')" className="mt-2" style="color:red;" /> */}
            </div>
            {/* {{-- Author --}} */}
            <div className="form-floating">
              <input
                id="author"
                name="author"
                type="text"
                className="form-control typeahead"
                placeholder="Author"
                css={css`
                  border-radius: 0;
                `}
                value={data.author_id}
                onChange={handleChange}
              />
              <label htmlFor="author">Author</label>
            </div>
            {/* {{-- Publisher --}} */}
            <div className="form-floating">
              <input
                id="publisher"
                name="publisher"
                type="text"
                className="form-control typeahead"
                placeholder="Publisher"
                css={css`
                  border-radius: 0;
                `}
                value={data.publisher_id}
                onChange={handleChange}
              />
              <label htmlFor="publisher">Publisher</label>
            </div>
            {/* {{-- Description --}} */}
            <div className="form-floating">
              <textarea
                id="description"
                name="description"
                className="form-control"
                css={css`
                  height: 120px;
                  border-radius: 0;
                `}
                placeholder="Description"
                value={data.description}
                onChange={handleChange}
              />
              <label htmlFor="description" className="">
                Description
              </label>
              {/* <x-input-error :messages="$errors->get('description')" className="mt-2" /> */}
            </div>
            {/* {{-- Amount --}} */}
            <div className="form-floating">
              <input
                id="amount"
                name="amount"
                type="number"
                className="form-control"
                css={css`
                  border-top-left-radius: 0;
                  border-top-right-radius: 0;
                `}
                pattern="^[0-9]+$"
                value={data.amount}
                onChange={handleChange}
              />
              <label htmlFor="amount" className="">
                Amount<small className="text-danger ms-1">Required</small>
              </label>
              {/* <x-input-error :messages="$errors->get('amount')" className="mt-2" /> */}
            </div>
            {/* {{-- Image --}} */}
            {/* <div className="my-2">
            <label htmlFor="cover" className="form-label">
              Book Cover Image
            </label>
            <input
              type="file"
              id="cover"
              name="cover"
              className="form-control"
              value={data.image_path}
              onChange={handleChange}
            />
            <label
              htmlFor="preview"
              id="previewLabel"
              className="my-2"
              css={css`
                display: none;
              `}
            >
              Uploaded Image Preview
            </label>
            <img
              id="preview"
              src={`/storage/images/books/${book?.img_path}`}
              alt="your image"
              className="w-100"
              css={css`
                display: none;
                object-fit: cover;
                object-position: center;
              `}
            />
          </div> */}
            <PrimaryButtonComponent type="submit" disabled={processing}>
              Register
            </PrimaryButtonComponent>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default BooksUpsertPage

{
  /* @push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
    <script>
        // Image Preview
        cover.onchange = evt => {
            preview = document.getElementById('preview');
            preview.style.display = 'block';
            previewLabel.style.display = 'block';
            const [file] = cover.files
            if (file) {
                preview.src = URL.createObjectURL(file)
            }
        }
    </script>
    <script>
        const option = {
            autoSelect: false,
            minLength: -1, // 空文字でも検索できるように
            items: 'all',
        }

        // Author Autocomplete
        $author = $('#author');
        const authors_autocomplete = "{{ route('authors.autocomplete') }}";
        $author.typeahead({
            ...option,
            source: (query, process) => $.get(authors_autocomplete, { query: query }, (data) => process(data)),
        });
        $author.on('click', () => $author.typeahead('lookup'));

        // Publisher Autocomplete 
        $publisher = $('#publisher');
        const publishers_autocomplete = "{{ route('publishers.autocomplete') }}";
        $publisher.typeahead({
            ...option,
            source: (query, process) => $.get(publishers_autocomplete, { query: query }, (data) => process(data)),
        });
        $publisher.on('click', () => $publisher.typeahead('lookup'));
    </script>
@endpush */
}
