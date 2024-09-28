import { Outlet } from "@remix-run/react";

import { authenticator } from "../services/auth.server";

import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/books",
  });
  return {};
};

export default function Index() {
  return <Outlet />;
}
