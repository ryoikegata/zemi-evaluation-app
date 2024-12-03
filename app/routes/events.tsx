import { Button, Link, List, ListItem, Sheet, Typography } from "@mui/joy";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { group } from "console";
import { getAllEvents } from "~/models/event.server";

export const loader = async () => {
  const events = await getAllEvents();
  return { events };
}

export default function Events() {
  const { events } = useLoaderData<typeof loader>();
  const groups = [
    { id: 1, group: "お店大賞" },
    { id: 2, group: "立川" },
    { id: 3, group: "ポイント" },
    { id: 4, group: "全対象" },
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
          イベント一覧
        </Typography>
        <List>
          {events.map((event) => (
            <ListItem key={event.id} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }} >
              <Typography>{event.name}<Typography sx={{
                fontSize: 'xs',
                ml: 2,
              }}>
                {groups.find(group => event.groupId === group.id)?.group}
              </Typography></Typography>
              <Link href={`/events/${event.id}`} variant="plain">
                <Typography>&rarr;</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Sheet>
    </>
  )
}