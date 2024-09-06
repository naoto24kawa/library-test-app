import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { AxiosError } from "axios";

import { BookForm } from "../components/BookForm";
import { setupForm, getFormData } from "../components/BookForm/server";
import axios from "../utils/axios";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await setupForm(request);
    return json(response.data);
  } catch (error) {
    return json(
      { error: `予期せぬエラーが発生しました: ${error}` },
      { status: 400 }
    );
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    // フォームデータを取得
    const data = await getFormData(request);

    // バリデーションエラーがある場合は返す
    if ("errors" in data) {
      return json(data);
    }

    // APIにPOSTリクエストを送信
    const response = await axios.postMultipartForm(
      `/test/book/create`,
      data,
      request
    );

    // 成功した場合はリダイレクト
    if (response.status === 200) {
      return redirect(`/books`);
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

export default function BooksCreate() {
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
  const { authors, publishers } = loaderData;
  const errors = actionData?.errors;

  return (
    <>
      <h1>{`books.create.tsx`}</h1>
      <h4 className="mb-3">Library Register</h4>
      <h4>Detail</h4>
      <BookForm authors={authors} publishers={publishers} errors={errors} />
    </>
  );
}
