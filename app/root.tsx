import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import "~/styles/tailwind.css";
import { Header } from "./components/Header";
import { authenticator } from "./auth.server";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  return { user };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: '/auth/login' })
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行される処理
    setIsClient(true);
  }, []);

  if (!isClient) {
    // クライアントサイドでの準備ができていない場合
    return null;
  }

  return (
    <div>
      {user ? (
        <div>
          <Header user={user} />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <Outlet />
      )}

    </div>
  );
}

