import { Button, Link, List, ListItem, Sheet, Typography } from "@mui/joy";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/models/user.server";

export const loader = async () => {
  const users = await getAllUsers();
  return { users };
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();
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
    <>
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
          生徒一覧
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }} >
              <Typography>{user.name}<Typography sx={{
                fontSize: 'xs',
                ml: 2,
              }}>
                {groups.find(group => user.group_id === group.id)?.group}
              </Typography></Typography>
              <Link href={`/users/${user.id}`} variant="plain">
                <Typography>&rarr;</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Sheet>
    </>
  )
}