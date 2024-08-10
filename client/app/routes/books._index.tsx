import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import axios from "../utils/axios";
// import Pagination from "@mui/material/Pagination";
// import PaginationItem from "@mui/material/PaginationItem";
// import Stack from "@mui/material/Stack";
import { Pagination as PaginationType } from "../types/Pagination";
import { Book } from "../types/Book";
import { css } from "../../styled-system/css";
import { vstack } from "../../styled-system/patterns";
import BookCardComponent from "../components/BookCardComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "HogeHoge" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  try {
    const response = await axios.get<PaginationType<Book>>("/test");
    if (!response.data) {
      throw new Response("Not Found", { status: 404 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function BooksIndex() {
  const books = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        books._index.tsx
      </h1>
      <div className={vstack()}>
        {/* <Stack alignItems="end"> */}
        {/* <Pagination
            className="pb-3"
            page={books?.current_page}
            count={books?.last_page}
            renderItem={(item) => <PaginationItem {...item} />}
          /> */}
        {/* </Stack> */}
        {books?.data.map((book) => (
          <BookCardComponent book={book as Book} key={book.id} />
        ))}
      </div>
    </>
  );
}
