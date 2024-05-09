/** @jsx css, jsx */
/** @jsxFrag css, jsx */
import React from 'react'
import 'resources/css/library.css'
import BookCardComponent from '../components/BookCardComponent'
import Layout from '../layouts/Layout'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Stack from '@mui/material/Stack'
import { Link } from '@inertiajs/react'

type Props = {
  user: User
  books: {
    data: Book[]
    current_page: number
    last_page: number
  }
}

const LibraryListPage: React.FunctionComponent<Props> = ({ user, books }) => {
  console.log(books)
  return (
    <Layout>
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <Stack alignItems="end">
            <Pagination
              className="pb-3"
              page={books.current_page}
              count={books.last_page}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  href={`/react/books?page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Stack>
          <div className="row mb-2">
            {books.data.map((book) => (
              <div className="col-lg-6 col-md-12">
                <BookCardComponent user={user} book={book} />
              </div>
            ))}
          </div>
          {/* {{ $books->links() }} */}
        </div>
      </div>
    </Layout>
  )
}

export default LibraryListPage
