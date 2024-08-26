import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
// import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import axios from "../utils/axios";
import { Pagination as PaginationType } from "../types/Pagination";
import { Book } from "../types/Book";
import Spinner from "../components/Spinner";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await axios.get<PaginationType<Book>>("/test", request);
    if (!response.data) {
      throw new Response("Not Found", { status: 404 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Index() {
  const books = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Spinner />
      <h1>Welcome to Remix</h1>
      <Outlet />
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
