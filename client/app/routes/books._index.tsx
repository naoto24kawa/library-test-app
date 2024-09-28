import {
  useLoaderData,
  Form,
  useOutletContext,
  redirect,
  json,
  useSearchParams,
} from "@remix-run/react";
import { decode } from "html-entities";

import { css } from "../../styled-system/css";
import BookCardComponent from "../components/BookCard";
import {
  rentalBook,
  returnBook,
  deleteBook,
} from "../components/BookCard/server";
import { authenticator } from "../services/auth.server";
import { button } from "../styles/button.css";
import axios from "../utils/axios";

import type { Authentication } from "../types/Authentication";
import type { Pagination as PaginationType } from "../types/Pagination";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "HogeHoge" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<{
  books: PaginationType<Book> | null;
  q: string | null;
  error: string | null;
}> => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const response = await axios.get<PaginationType<Book>>(
      `/api/test/book${url.search}`,
      {
        headers: {
          Authorization: `Bearer ${
            (
              await authenticator.isAuthenticated(request)
            )?.token
          }`,
        },
      }
    );

    if (!response.data) {
      throw new Error("データが見つかりません");
    }

    return json({ books: response.data, q: q, error: null });
  } catch (error) {
    console.error("ブックデータの取得中にエラーが発生しました:", error);
    let errorMessage = "データの取得中にエラーが発生しました";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return json({ books: null, q: null, error: errorMessage }, { status: 500 });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  if (_action === "rental") {
    return await rentalBook(request);
  }

  if (_action === "delete") {
    await deleteBook(request);
    // TODO: responseのチェックが必要
    return redirect("/books");
  }

  if (_action === "return") {
    await returnBook(request);
    // TODO: responseのチェックが必要
    return redirect("/books");
  }

  return null;
};

export default function BooksIndex() {
  // context
  const session = useOutletContext<Authentication>();
  // loader
  const { books, q } = useLoaderData<typeof loader>();
  // search params
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        books._index.tsx
      </h1>
      <Form
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          // name=qの値を参照したい
          const q = (e.target as HTMLFormElement).q.value;
          setSearchParams(
            (prev) => {
              q ? prev.set("q", q) : prev.delete("q");
              return prev;
            },
            { replace: true }
          );
        }}
      >
        {/* TODO: event function等をテスト可能なサイズに切り分けたい */}
        <fieldset className={css({ display: "flex" })}>
          <input
            name="q"
            type="text"
            className={css({
              bg: "white",
              border: "1px solid",
              borderColor: "gray.200",
              borderRadius: "sm",
              width: "100%",
              padding: "2",
            })}
            defaultValue={q || ""}
          />
          <button className={button()} type="submit">
            Search
          </button>
        </fieldset>
      </Form>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
        })}
      >
        {books?.links.map((paginationLink) => {
          return paginationLink.url ? (
            <button
              key={paginationLink.label}
              className={css({
                padding: "2",
                margin: "2",
                cursor: !paginationLink.active ? "pointer" : "default",
              })}
              onClick={() => {
                if (!paginationLink.active) {
                  setSearchParams(
                    (prev) => {
                      const urlParams = new URLSearchParams(
                        paginationLink.url.split("?")[1]
                      );
                      const page = urlParams.get("page");
                      page ? prev.set("page", page) : prev.delete("page");
                      return prev;
                    },
                    { replace: true }
                  );
                }
              }}
            >
              {decode(paginationLink.label, { level: "html5" })}
            </button>
          ) : null;
        })}
      </div>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: {
            base: "repeat(3, 1fr)",
            sm: "repeat(4, 1fr)",
            lg: "repeat(6, 1fr)",
          },
          gap: "1",
        })}
      >
        {books?.data.map((book) => (
          <BookCardComponent
            book={book as Book}
            userId={session.id}
            key={book.id}
          />
        ))}
      </div>
    </>
  );
}
