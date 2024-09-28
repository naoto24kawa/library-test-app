import { createCookieSessionStorage } from "@remix-run/node";

import { SESSION_SECRET } from "../../conf";

const sessionSecret: string | undefined = SESSION_SECRET;
if (sessionSecret === undefined)
  throw new Error("SESSION_SECRETを設定してください。");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "remix_auth_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [sessionSecret],
    secure: false,
    maxAge: 60 * 60 * 24,
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
