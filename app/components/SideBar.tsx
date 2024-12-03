import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, Typography } from '@mui/joy';
import { Form } from '@remix-run/react';
import { useState, Fragment } from 'react';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const sidebarItems = ['イベント参加状態', '出席状態', 'タスク進捗状態'];

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
            {sidebarItems.map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
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
