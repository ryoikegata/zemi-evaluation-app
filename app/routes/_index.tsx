import { Button, FormControl } from "@mui/joy";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })

  return { user }
}

export const action = async({ request }: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: '/auth/login' })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <>
    <h1>{user.email}</h1>
    <Form method="POST">
      <Button type="submit" name="action" value="logout" >Logout</Button>
    </Form>
    </>
  );
}
