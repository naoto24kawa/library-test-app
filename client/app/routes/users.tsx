import { Outlet } from "@remix-run/react";

export default function Users() {
  return (
    <>
      <h1>users.tsx</h1>
      <Outlet />
    </>
  );
}
