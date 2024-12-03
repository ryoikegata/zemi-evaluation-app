import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { postEvent } from "~/models/event.server";
import { Button, FormControl, FormLabel, Input, Textarea, Sheet, Typography, Select, Option } from "@mui/joy";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const group_id = Number(formData.get("group_id"));
  const event_date = new Date(formData.get("event_date") as string);

  const errors = {
    name: !name ? "イベント名を入力してください。" : null,
    description: !description ? "説明を入力してください。" : null,
    group_id: !group_id ? "グループを選択してください。" : null,
    event_date: isNaN(event_date.getTime()) ? "有効な開催日時を入力してください。" : null,
  };

  if (Object.values(errors).some(Boolean)) {
    return json({ errors }, { status: 400 });
  }

  const data = { name, description, group_id, event_date };
  return await postEvent(data);
};

export default function EventsCreate() {
  const actionData = useActionData<typeof action>();
  const groups = [
    { id: 1, group: "お店大賞" },
    { id: 2, group: "立川" },
    { id: 3, group: "ポイント" },
    { id: 4, group: "全対象" },
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
          <FormLabel>イベント名</FormLabel>
          <Input
            name="name"
            required
            placeholder="イベント名を入力"
            error={!!actionData?.errors?.name}
          />
          {actionData?.errors?.name && (
            <Typography color="danger">{actionData.errors.name}</Typography>
          )}
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>説明</FormLabel>
          <Textarea
            name="description"
            required
            minRows={3}
            placeholder="イベントの説明を入力"
            error={!!actionData?.errors?.description}
          />
          {actionData?.errors?.description && (
            <Typography color="danger">{actionData.errors.description}</Typography>
          )}
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>開催日時</FormLabel>
          <Input
            type="datetime-local"
            name="event_date"
            required
            error={!!actionData?.errors?.event_date}
          />
          {actionData?.errors?.event_date && (
            <Typography color="danger">{actionData.errors.event_date}</Typography>
          )}
        </FormControl>

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>グループ</FormLabel>
          <Select
            name="group_id"
            required
            placeholder="グループを選択"
          >
            {groups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.group}
              </Option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" sx={{ mt: 2 }}>
          イベントを作成
        </Button>
      </Form>
    </Sheet>
  );
}