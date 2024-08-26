import { Link, Outlet, useOutletContext } from "@remix-run/react";
import { Authentication } from "../types/Authentication";
import { link } from "../styles/link.css";

export default function Books() {
  const session = useOutletContext<Authentication>();
  return (
    <>
      <Link className={link()} to="/books/create">
        Create
      </Link>
      <h1>books.tsx</h1>
      <Outlet context={session} />
    </>
  );
}
