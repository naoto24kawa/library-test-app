import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "../utils/axios";
import BookCardComponent from "../components/BookCardComponent";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<Book>(`/test/${params.bookId}`);
    if (!response.data) {
      throw new Response("Not Found", { status: 404 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function BooksBookId() {
  const book = useLoaderData<typeof loader>();
  return (
    <>
      <h1>{`books.$bookId.tsx(bookId: ${book?.id})`}</h1>
      <BookCardComponent book={book as Book} />
    </>
  );
}
