import { Box, Button } from "@mui/joy";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/auth.server";
import { Sidebar } from "~/components/SideBar";
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

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: '/auth/login' })
}

export default function Index() {
  const { user, classAttendances, eventAttendances, works } = useLoaderData<typeof loader>()
  return (
    <>
    <header className=" flex justify-between p-5 ">
      <div>
      <p>{user.student_id}さん</p>
      </div>
      <div>
      <Sidebar user={user} />
      </div>
    </header>
    <div>
      <p>イベント参加回数</p>
      <p>{eventAttendances.length}回</p>
      <p>詳細</p>
    </div>
    <div>
      <p>授業参加回数</p>
      <p>{classAttendances.length}回</p>
      <p>詳細</p>
    </div>
    <div>
      <p>タスク数</p>
      <p>{works.length}個</p>
      <p>詳細</p>
    </div>
    </>
  );
}
