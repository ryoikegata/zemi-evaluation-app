import { Box, Button, Divider, Drawer, Link, List, ListItem, ListItemButton, Typography } from '@mui/joy';
import { Form } from '@remix-run/react';
import { useState, Fragment } from 'react';

type SidebarProps = {
  user: Omit<{
    id: number
    student_id: string
    name: string
    email: string
    password: string
    group_id: number
    role_id: number
    createdAt: string
  }, 'password'>
}

export const Sidebar = ({ user }: SidebarProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const sidebarItems = [
    { text: 'イベント参加状態', route: '/events/participation' },
    { text: '出席状態', route: '/attendance' },
    { text: 'タスク進捗状態', route: '/tasks/progress' }
  ];

  const NotGeneralItems = [
    { text: 'イベント作成', route: '/events/create' },
    { text: 'タスク作成', route: '/tasks/create' },
    { text: '生徒追加', route: '/users/create' },
    { text: '生徒編集', route: '/users/edit' }
  ];

  const ListItems = [
    { text: 'イベント一覧', route: '/events' },
    { text: 'タスク一覧', route: '/tasks' },
    { text: '生徒一覧', route: '/users' }
  ];
  return (
    <Fragment>
      <Typography color="neutral" sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        cursor: 'pointer',
        alignItems: 'center',
      }} onClick={handleClick}>
        <span className='border w-6 block border-black'></span>
        <span className='border w-6 block border-black'></span>
        <span className='border w-6 block border-black'></span>
      </Typography>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {user.role_id !== 2 && NotGeneralItems.map((item) => (
              <ListItem key={item.text}>
                <Link href={item.route}>
                  <ListItemButton>{item.text}</ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <List>
            {ListItems.map((item) => (
              <ListItem key={item.text}>
                <Link href={item.route}>
                  <ListItemButton>{item.text}</ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.text}>
                <Link href={item.route}>
                  <ListItemButton>{item.text}</ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Form method="POST">
            <Button type="submit" name="action" value="logout" sx={{
              color: 'white',
              backgroundColor: 'red.500',
            }} >ログアウト</Button>
          </Form>
        </Box>
      </Drawer>
    </Fragment>
  );
}
