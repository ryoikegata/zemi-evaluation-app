import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createUser } from "~/models/user.server";
import { Button, FormControl, FormLabel, Input, Textarea, Sheet, Typography, Select, Option } from "@mui/joy";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const student_id = formData.get("student_id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const group_id = Number(formData.get("group_id"));
  const role_id = Number(formData.get("role_id"));

  if (!student_id) {
    return json({ errors: { _form: "学籍番号を入力してください。" } });
  }
  if (!name) {
    return json({ errors: { _form: "名前を入力してください。" } });
  }
  if (!email) {
    return json({ errors: { _form: "メールアドレスを入力してください。" } });
  }
  if (!group_id) {
    return json({ errors: { _form: "グループを選択してください。" } });
  }
  if (!role_id) {
    return json({ errors: { _form: "ロールを選択してください。" } });
  }

  const data = { name, email, group_id, role_id, student_id };
  return await createUser(data);
};

export default function Create() {
  const actionData = useActionData<typeof action>();
  const groups = [
    { id: 1, group: "お店大賞" },
    { id: 2, group: "立川" },
    { id: 3, group: "ポイント" },
    { id: 4, group: "全対象" },
  ];

  const roles = [
    { id: 1, role: "先生" },
    { id: 2, role: "一般生徒" },
    { id: 3, role: "幹部" },
    { id: 4, role: "管理者" },
  ];

  return (
    <Sheet
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mb: 4,
        py: 10,
        px: 2,
        borderRadius: 'sm',
      }}
    >
      <Typography level="h4" component="h1" sx={{ mb: 2 }}>
        イベント作成
      </Typography>
      <Form method="post">
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>学籍番号</FormLabel>
          <Input
            name="student_id"
            required
            placeholder="学籍番号を入力"
          />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>名前</FormLabel>
          <Input
            name="name"
            required
            placeholder="名前を入力"
          />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            name="email"
            required
            placeholder="メールアドレスを入力"
          />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>グループ</FormLabel>
          <Select name="group_id" required>
            {groups.map(group => (
              <Option key={group.id} value={group.id}>{group.group}</Option>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel>ロール</FormLabel>
          <Select name="role_id" required>
            {roles.map(role => (
              <Option key={role.id} value={role.id}>{role.role}</Option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" sx={{ mt: 2 }}>
          生徒を追加
        </Button>
      </Form>
      {actionData?.errors?._form && (
        <Typography color="danger" sx={{ mt: 2 }}>
          {actionData.errors._form}
        </Typography>
      )}
    </Sheet>
  );
}