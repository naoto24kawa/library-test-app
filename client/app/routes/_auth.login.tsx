import { Form } from "@remix-run/react";

import { css } from "../../styled-system/css";
import { authenticator } from "../services/auth.server";
import { button } from "../styles/button.css";

import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("user-login", request, {
    successRedirect: "/books",
    failureRedirect: "/login",
  });
}

export default function Login() {
  return (
    <>
      <h1>_auth/login.tsx</h1>
      <Form method="post">
        email
        <input
          className={css({
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            margin: "8px",
          })}
          type="email"
          name="email"
          required
        />
        password
        <input
          className={css({
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            margin: "8px",
          })}
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <button type="submit" className={button()}>
          Sign In
        </button>
      </Form>
    </>
  );
}
