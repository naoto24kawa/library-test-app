import { Form, useLoaderData, useOutletContext } from "@remix-run/react";

import { css } from "../../styled-system/css";
import BookCardComponent from "../components/BookCard";
import { link } from "../style.css";
import axios from "../utils/axios";

// import { Pagination as PaginationType } from "../types/Pagination";
import type { Authentication } from "../types/Authentication";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<Book>("/test/borrowed", request);
    if (!response.data) {
      throw new Response("Not Found", { status: 404 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { _action, ...data } = Object.fromEntries(formData);
  console.log(data);
  console.log(_action);

  if (_action === "return") {
    console.log("called return");
    axios.post("/test/return", data, request);
  }
  return null;
};

export default function UsersIndex() {
  const session = useOutletContext<Authentication>();
  const books = useLoaderData<typeof loader>();

  if (!books || "error" in books) {
    return <div>error</div>;
  }

  return (
    <>
      <p>Borrowed Books</p>
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
        {books.map((book) => (
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
