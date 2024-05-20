import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ bookId: params.bookId });
};

export default function BooksBookId() {
  const { bookId } = useLoaderData<typeof loader>();
  return <h1>{`books.$bookId.tsx(bookId: ${bookId})`}</h1>;
}
