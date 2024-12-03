import { prisma } from "~/libs/dbconnect";

export const postEvent = async (event: {
  name: string;
  description: string;
  group_id: number;
  event_date: Date;
}) => {
  try {
    await prisma.event.create({
      data: {
        name: event.name,
        description: event.description,
        groupId: event.group_id,
        eventDate: event.event_date,
      },
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/events",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('不明なエラーが発生しました');
  }
}