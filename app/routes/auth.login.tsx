import { Button, FormControl, FormLabel, Input, Sheet, Typography } from "@mui/joy";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useField, ValidatedForm } from "remix-validated-form";
import { authenticator } from "~/auth.server";
import { loginValidator } from "~/types/shema";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request, {
      successRedirect: '/',
    });

    return user || null;
  } catch (error) {
    console.error("Loader error:", error);
    return null;
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
    return await authenticator.authenticate('password', request, {
      successRedirect: '/',
      failureRedirect: '/auth/login',
    });
};


export default function Login() {
  const formId = "login-form"; // 任意のフォームIDを指定

  const emailField = useField('email', { formId });
  const passwordField = useField('password', { formId });

  return (
    <div className="">
      <ValidatedForm validator={loginValidator} method="POST" id={formId}>
        <Sheet sx={{
          width: 300,
          mx: 'auto',
          my:8,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'gray.100',
        }}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" id="email" name="email" {...emailField.getInputProps()} />
            {emailField.error && (
              <Typography>{emailField.error}</Typography>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" id="password" name="password" {...passwordField.getInputProps()} />
            {passwordField.error && (
              <Typography>{passwordField.error}</Typography>
            )}
          </FormControl>
          <Button type="submit" name="_action">ログイン</Button>
        </Sheet>
          </ValidatedForm>
          </div>
  );
}
