import { useLoaderData, useOutletContext } from "@remix-run/react";

import { css } from "../../styled-system/css";
import BookCardComponent from "../components/BookCard";
import { authenticator } from "../services/auth.server";
import axios from "../utils/axios";

import type { Authentication } from "../types/Authentication";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  try {
    const response = await axios.get<Book[]>("/api/test/borrowed", {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Response("Not Found", { status: 404 });
      }
      console.error("APIエラー:", error.message);
      throw new Error("APIエラーが発生しました");
    }
    console.error("予期せぬエラー:", error);
    throw new Error("予期せぬエラーが発生しました");
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { _action, ...data } = Object.fromEntries(formData);
  console.log(data);
  console.log(_action);

  if (_action === "return") {
    try {
      const response = await axios.post("/api/test/return", data, {
        headers: {
          Authorization: `Bearer ${
            (
              await authenticator.isAuthenticated(request)
            )?.token
          }`,
        },
      });
      // レスポンスの確認
      if (response.status === 200) {
        return { success: "本が正常に返却されました" };
      } else {
        return { error: "本の返却中に予期せぬエラーが発生しました" };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("APIエラー:", error.message);
        return { error: "本の返却中にAPIエラーが発生しました" };
      }
      console.error("予期せぬエラー:", error);
      return { error: "本の返却中に予期せぬエラーが発生しました" };
    }
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
