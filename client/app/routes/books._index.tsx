import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  useLoaderData,
  Link,
  useOutletContext,
  redirect,
} from "@remix-run/react";
import axios from "../utils/axios";
import { Pagination as PaginationType } from "../types/Pagination";
import { css } from "../../styled-system/css";
import { vstack, hstack } from "../../styled-system/patterns";
import BookCardComponent from "../components/BookCardComponent";
import { Authentication } from "../types/Authentication";
import { APP_URL } from "../../conf";
import { link } from "../styles/link.css";
import { decode } from "html-entities";

export const meta: MetaFunction = () => {
  return [
    { title: "HogeHoge" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<PaginationType<Book> | null> => {
  try {
    // parse the search params for `?q=`
    const url = new URL(request.url);
    const query = url.searchParams.get("page");

    const response = await axios.get<PaginationType<Book>>(
      `/test?page=${query}`,
      request
    );
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

  if (_action === "rental") {
    return await axios.post("/test/rental", data, request);
  }

  if (_action === "delete") {
    await axios.post("/test/delete", data, request);
    return redirect("/books");
  }

  // try {
  //   // フォームデータを処理し、APIにPOSTリクエストを送信
  //   const response = await axios.post(
  //     `/test/update/${params.bookId}`,
  //     {
  //       title: formData.get("title"),
  //     },
  //     request
  //   );
  //   console.log(response);

  //   // 成功した場合、更新された本の詳細ページにリダイレクト
  //   return redirect(`/books/${params.bookId}`);
  // } catch (error) {
  //   // エラーが発生した場合、エラーメッセージを返す
  //   console.error(error);
  //   return json({ error: "更新に失敗しました。" }, { status: 400 });
  // }
  return null;
};

export default function BooksIndex() {
  const session = useOutletContext<Authentication>();
  const books = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        books._index.tsx
      </h1>
      <div className={hstack()}>
        {books?.links.map((paginationLink) => (
          <Link
            key={paginationLink.label}
            className={link()}
            to={convertToClientURL(paginationLink.url)}
          >
            {decode(paginationLink.label, { level: "html5" })}
          </Link>
        ))}
      </div>
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

function convertToClientURL(link: string) {
  if (link && link.includes(APP_URL + "/api")) {
    return link.replace(APP_URL + "/api/test", "/books");
  }
  return link ?? "";
}
