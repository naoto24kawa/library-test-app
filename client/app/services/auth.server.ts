import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login } from "./login.server";
import { Authentication } from "../types/Authentication";

export const authenticator = new Authenticator<Authentication>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    const response = await login(String(email), String(password));
    return response;
  }),
  "user-login"
);
