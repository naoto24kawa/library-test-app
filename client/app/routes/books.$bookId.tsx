import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import axios from "../utils/axios";
import BookCardComponent from "../components/BookCardComponent";
import { Authentication } from "../types/Authentication";
import { vstack } from "styled-system/patterns";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<Book>(`/test/${params.bookId}`, request);
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
