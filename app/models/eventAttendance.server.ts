import { prisma } from "~/libs/dbconnect";


export const getEventAttendanceByStudentId = async (studentId: string) => {
  try {
    const eventAttendances = await prisma.eventAttendance.findMany({
      where: {
        studentId: studentId,
      },
    });
    return eventAttendances;
  } catch (error) {
    console.error("Error fetching event attendance:", error);
    throw new Error("Failed to fetch event attendance data.");
  }
}
