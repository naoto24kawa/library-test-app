import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
  useRouteError,
} from "@remix-run/react";

import styles from "./index.css?url";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Authentication } from "./types/Authentication";
import Spinner from "./components/Spinner";
import { authenticator } from "./services/auth.server";
import { link } from "./styles/link.css";
import { hstack } from "../styled-system/patterns";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigation = useNavigation();
  return (
    <html lang="jp">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={hstack({ gap: "10px" })}>
          <Link to="/" className={link()}>
            Home{" "}
          </Link>
          <Link to="/login" className={link()}>
            Login{" "}
          </Link>
          <Link to="/books" className={link()}>
            Books{" "}
          </Link>
          <Link to="/users" className={link()}>
            Users{" "}
          </Link>
        </div>
        <h1>{`root.tsx(${location.pathname})`}</h1>
        {navigation.state !== "idle" ? <Spinner /> : children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request);
};

export default function App() {
  const session = useLoaderData<Authentication>();
  return <Outlet context={session} />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </>
  );
}
