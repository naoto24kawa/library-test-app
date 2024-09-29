import {
  isRouteErrorResponse,
  json,
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

import { css } from "../styled-system/css";
import { hstack } from "../styled-system/patterns";

import Spinner from "./components/Spinner";
import styles from "./index.css?url";
import { authenticator } from "./services/auth.server";
import { link } from "./styles/link.css";

import type { LinksFunction, ActionFunctionArgs } from "@remix-run/node";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }: ActionFunctionArgs) => {
  const session = await authenticator.isAuthenticated(request);
  return json({
    session,
    ENV: {
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
      FAUNA_DB_URL: process.env.FAUNA_DB_URL,
      TEST_ATTR: "window env test",
    },
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
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
      <body className={css({ bg: "gray.50" })}>
        <header>
          <div className={hstack({ gap: "10px" })}>
            <Link to="/login" className={link()}>
              Login{" "}
            </Link>
            <Link to="/register" className={link()}>
              Register{" "}
            </Link>
            <Link to="/books" className={link()}>
              Books{" "}
            </Link>
            <Link to="/users" className={link()}>
              Users{" "}
            </Link>
          </div>
          <h1>{`root.tsx(${location.pathname})`}</h1>
        </header>
        {navigation.state !== "idle" && <Spinner />}
        {children}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return <Outlet context={data.session} />;
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
