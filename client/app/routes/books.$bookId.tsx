import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";

import { vstack } from "../../styled-system/patterns";
import BookCardComponent from "../components/BookCard";
import { authenticator } from "../services/auth.server";
import axios from "../utils/axios";

import type { Authentication } from "../types/Authentication";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<Book>(`/api/test/book/${params.bookId}`, {
      headers: {
        Authorization: `Bearer ${
          (
            await authenticator.isAuthenticated(request)
          )?.token
        }`,
      },
    });
    if (!response.data) {
      throw new Response("本が見つかりません", { status: 404 });
    }
    return json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Response("本が見つかりません", { status: 404 });
      } else {
        console.error("APIエラー:", error.message);
        throw new Response("サーバーエラーが発生しました", { status: 500 });
      }
    } else {
      console.error("予期せぬエラー:", error);
      throw new Response("予期せぬエラーが発生しました", { status: 500 });
    }
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
