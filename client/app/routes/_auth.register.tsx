import { Form, json, redirect } from "@remix-run/react";

import { css } from "../../styled-system/css";
import { form, button } from "../style.css";
import axios from "../utils/axios";

import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // 入力値のバリデーション
  const errors: { [key: string]: string } = {};
  if (!name) errors.name = "名前は必須です";
  if (!email) errors.email = "メールアドレスは必須です";
  if (!password) errors.password = "パスワードは必須です";
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });

    // APIからのレスポンスを確認
    if (response.status !== 200) {
      return json(
        { errors: { server: "登録に失敗しました" } },
        { status: 500 }
      );
    }

    return redirect("/login");
  } catch (error) {
    console.error("登録エラー:", error);
    return json(
      { errors: { server: "サーバーエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export default function Register() {
  const { root, group, control, label } = form.raw({ size: "lg" });
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
      })}
    >
      <Form
        method="post"
        className={css(root, {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <fieldset className={css(group)}>
          <span className={css(label)}>username</span>
          <input className={css(control)} type="text" name="name" required />
        </fieldset>
        <fieldset className={css(group)}>
          <span className={css(label)}>email</span>
          <input className={css(control)} type="email" name="email" required />
        </fieldset>
        <fieldset className={css(group)}>
          <span className={css(label)}>password</span>
          <input
            className={css(control)}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </fieldset>
        <button type="submit" className={button()}>
          Register
        </button>
      </Form>
    </div>
  );
}
