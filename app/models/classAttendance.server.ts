import { prisma } from "~/libs/dbconnect";

export const getClassAttendanceByStudentId = async (studentId: string) => {
  try {
    const classAttendances = await prisma.classAttendance.findMany({
      where: {
        studentId: studentId,
      },
    });
    return classAttendances;
  } catch (error) {
    console.error("Error fetching class attendance:", error);
    throw new Error("Failed to fetch class attendance data.");
  }
}
