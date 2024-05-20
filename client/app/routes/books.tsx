import { Outlet } from "@remix-run/react";

export default function Books() {
  return (
    <>
      <h1>books.tsx</h1>
      <Outlet />
    </>
  );
}
