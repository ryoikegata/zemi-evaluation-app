import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, Typography } from '@mui/joy';
import { Form } from '@remix-run/react';
import React, { useState, Fragment, useEffect } from 'react';


export const Sidebar = ({user}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Typography color="neutral" onClick={handleClick}>
        メニュー
      </Typography>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List>
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
