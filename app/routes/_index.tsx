import { Box, Button, Link } from "@mui/joy";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/auth.server";
import { getClassAttendanceByStudentId } from "~/models/classAttendance.server";
import { getEventAttendanceByStudentId } from "~/models/eventAttendance.server";
import { getWorkByStudentId } from "~/models/work.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })

  const classAttendances = await getClassAttendanceByStudentId(user.student_id)
  const eventAttendances = await getEventAttendanceByStudentId(user.student_id)
  const works = await getWorkByStudentId(user.student_id)

  return { user, classAttendances, eventAttendances, works }
}

export default function Index() {
  const { user, classAttendances, eventAttendances, works } = useLoaderData<typeof loader>()
  return (
    <>
    <Box sx={{
      width: '90%',
      margin: 'auto',
      height: '100vh',
      paddingTop: 12,
    }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
      gap: 4,
    }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 3,
      height: 80,
    }}>
      <p className="text-left ml-2">イベント参加回数</p>
      <p className="text-center"><span className="text-2xl">{eventAttendances.length}</span>回</p>
      <Link href="/event">
      <Button className=" text-center">詳細</Button>
      </Link>
    </Box>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 4,
      height: 80,
    }}>
      <p className="text-left ml-2">イベント参加回数</p>
      <p className="text-center"><span className="text-2xl">{eventAttendances.length}</span>回</p>
      <Button className="text-center">詳細</Button>
    </Box>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 4,
      height: 80,
    }}>
      <p className="text-left ml-2">イベント参加回数</p>
      <p className="text-center"><span className="text-2xl">{eventAttendances.length}</span>回</p>
      <Button className=" text-center">詳細</Button>
    </Box>
    </Box>
    </Box>
    </>
  );
}
