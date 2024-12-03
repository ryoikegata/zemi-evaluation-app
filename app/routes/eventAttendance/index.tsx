import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth.server";
import { getEventAttendanceByStudentId } from "~/models/eventAttendance.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/auth/login',
    });
    const eventAttendances = await getEventAttendanceByStudentId(user.student_id);
    return { eventAttendances }
  } catch {
    return null;
  }
};
export default function AttendanceEvent () {
  return (
    <>
    </>
  )

}