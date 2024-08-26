import { useLoaderData } from "@remix-run/react";
import axios from "../utils/axios";
import { getSession } from "../services/session.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

import path from "path";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // const cookieStore = request.headers.get("Cookie");
  // console.log(`cookieStore: ${JSON.stringify(cookieStore)}`);
  // const session = await getSession(request.headers.get("Cookie"));
  // const token = session.data.user.token;
  // console.log(`token: ${JSON.stringify(token)}`);
  const user = await authenticator.isAuthenticated(request);
  console.log(`user: ${JSON.stringify(user)}`);

  // await authenticator.logout(request, { redirectTo: "/login" });

  // const response = await axios.get<User>("/user", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // console.log(`response: ${JSON.stringify(response.data)}`);
  // try {
  //   const response = await axios.get<User>("/user");
  //   if (!response.data) {
  //     throw new Response("Not Found", { status: 404 });
  //   }
  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
  return null;
};

export default function Success() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>_auth/login.tsx</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
