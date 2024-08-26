import { useLoaderData, useOutletContext } from "@remix-run/react";
import axios from "../utils/axios";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { Pagination as PaginationType } from "../types/Pagination";
import BookCardComponent from "../components/BookCardComponent";
import { Authentication } from "../types/Authentication";
import { vstack } from "../../styled-system/patterns";

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

export default function UsersIndex() {
  const session = useOutletContext<Authentication>();
  const books = useLoaderData<typeof loader>();
  return (
    <div className={vstack()}>
      {books?.map((book) => (
        <BookCardComponent
          book={book as Book}
          userId={session.id}
          key={book.id}
        />
      ))}
    </div>
  );
}
