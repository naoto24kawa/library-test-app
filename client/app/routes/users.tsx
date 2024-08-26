import { Outlet, useOutletContext } from "@remix-run/react";
import { Authentication } from "../types/Authentication";

export default function Users() {
  const session = useOutletContext<Authentication>();
  return (
    <>
      <h1>users.tsx</h1>
      <Outlet context={session} />
    </>
  );
}
