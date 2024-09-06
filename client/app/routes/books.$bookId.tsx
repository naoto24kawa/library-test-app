import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { vstack } from "styled-system/patterns";

import BookCardComponent from "../components/BookCard";
import axios from "../utils/axios";

import type { Authentication } from "../types/Authentication";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<Book>(
      `/test/book/${params.bookId}`,
      request
    );
    if (!response.data) {
      throw new Response("Not Found", { status: 404 });
    }
    return json(response.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function BooksBookId() {
  const session = useOutletContext<Authentication>();
  const book = useLoaderData<typeof loader>();
  return (
    <>
      <h1>{`books.$bookId.tsx(bookId: ${book?.id})`}</h1>
      <div className={vstack()}>
        <BookCardComponent book={book as Book} userId={session.id} />
      </div>
    </>
  );
}
