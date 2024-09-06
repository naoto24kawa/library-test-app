import { Link, Outlet, useOutletContext } from "@remix-run/react";

import { layout } from "../styles/layout.css";
import { link } from "../styles/link.css";

import type { Authentication } from "../types/Authentication";

export default function Books() {
  const session = useOutletContext<Authentication>();
  return (
    <div className={layout()}>
      <h1>books.tsx</h1>
      <Link className={link()} to="/books/create">
        Create
      </Link>
      <Outlet context={session} />
    </div>
  );
}
