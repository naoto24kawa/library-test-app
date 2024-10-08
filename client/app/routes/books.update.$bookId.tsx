import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { AxiosError } from "axios";

import { BookForm } from "../components/BookForm";
import { setupForm, getFormData } from "../components/BookForm/server";
import { authenticator } from "../services/auth.server";
import axios from "../utils/axios";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    const book = await axios.get<Book>(`/api/test/book/${params.bookId}`, {
      headers: {
        Authorization: `Bearer ${
          (
            await authenticator.isAuthenticated(request)
          )?.token
        }`,
      },
    });
    if (!book.data) {
      throw new Response(`Not Found: (bookId: ${params.bookId})`, {
        status: 404,
      });
    }

    let setupFormResponse;
    try {
      setupFormResponse = await setupForm(request);
    } catch (setupError) {
      console.error("setupForm エラー:", setupError);
      return json(
        { error: "フォームの初期化中にエラーが発生しました。" },
        { status: 500 }
      );
    }

    return json({
      book: book.data,
      authors: setupFormResponse.authors,
      publishers: setupFormResponse.publishers,
    });
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

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    // フォームデータを取得
    const data = await getFormData(request);

    // バリデーションエラーがある場合は返す
    if ("errors" in data) {
      return json(data);
    }

    // APIにPOSTリクエストを送信
    const response = await axios.post(
      `/api/test/update/${params.bookId}`,
      data,
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

    // 成功した場合、更新された本の詳細ページにリダイレクト
    if (response.status === 200) {
      return redirect(`/books/${params.bookId}`);
    }

    // 予期せぬエラーが発生した場合はエラーメッセージを返す
    return json(
      { error: `予期せぬエラーが発生しました: ${response.statusText}` },
      { status: 500 }
    );
  } catch (error: unknown) {
    // Axiosエラーの場合はエラーメッセージを返す
    if (error instanceof AxiosError) {
      return json(error.response?.data);
    }

    // 予期せぬエラーが発生した場合はエラーメッセージを返す
    return json(
      { error: `予期せぬエラーが発生しました: ${error}` },
      { status: 500 }
    );
  }
};

export default function BooksBookId() {
  // loader
  const loaderData = useLoaderData<typeof loader>();
  // action
  const actionData = useActionData<typeof action>();

  // 型ガード
  if (
    (loaderData && "error" in loaderData) ||
    (actionData && "error" in actionData)
  ) {
    const errorMessage =
      "error" in loaderData ? loaderData.error : actionData.error;
    return <div>エラー: {errorMessage}</div>;
  }

  // 型を確定
  const { authors, publishers, book } = loaderData;
  const errors = actionData?.errors;

  return (
    <>
      <h1>{`books.update.$bookId.tsx(bookId: ${book.id})`}</h1>
      <h4>Library Register</h4>
      <h4>Detail</h4>
      <BookForm
        authors={authors}
        publishers={publishers}
        book={book}
        errors={errors}
      />
    </>
  );
}
