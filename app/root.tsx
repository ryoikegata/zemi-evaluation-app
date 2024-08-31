import {
  Links,
  Meta,
  Outlet,
} from "@remix-run/react";
import { CssVarsProvider } from "@mui/joy";
import { Suspense } from "react";
import "~/styles/tailwind.css";

//tailwindcssのスタイルを読み込む

export default function App() {
  return (
    <>
        <CssVarsProvider>
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>ゼミ管理APP</title>
          <Meta />
          <Links />
        </head>
            <Outlet />
      </html>
        </CssVarsProvider>
    </>
  );
}
