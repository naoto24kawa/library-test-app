import { Form, Outlet, useOutletContext } from "@remix-run/react";

import { layout, link } from "../style.css";

import type { Authentication } from "../types/Authentication";
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { _action, ...data } = Object.fromEntries(formData);

  if (_action === "logout") {
    console.log("called logout");
  }
};

export default function Users() {
  const session = useOutletContext<Authentication>();
  return (
    <div className={layout()}>
      <Form
        action="/logout"
        method="post"
        onSubmit={(event) => {
          const response = confirm("Please confirm you want to logout.");
          if (!response) {
            event.preventDefault();
          }
        }}
      >
        <button className={link()} type="submit">
          Logout
        </button>
      </Form>
      <h1>users.tsx</h1>
      <Outlet context={session} />
    </div>
  );
}
