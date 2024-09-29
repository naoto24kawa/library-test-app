import { Form } from "@remix-run/react";

import { css } from "../../styled-system/css";
import { authenticator } from "../services/auth.server";
import { form } from "../style.css";
import { button } from "../styles/button.css";

import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("user-login", request, {
    successRedirect: "/books",
    failureRedirect: "/login",
  });
}

export default function Login() {
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
          Sign In
        </button>
      </Form>
    </div>
  );
}
