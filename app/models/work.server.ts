import { prisma } from "~/libs/dbconnect";

export const getWorkByStudentId = async (studentId: string) => {
  try {
    console.log("Fetching work data for studentId:", studentId); // studentId が正しいか確認
    const works = await prisma.work.findMany({
      where: {
        studentId: studentId,
      },
    });
    console.log("Fetched works:", works); // 取得したデータを確認

    if (works.length === 0) {
      console.log("No work data found for studentId:", studentId);
      return [];
    } else {
      return works;
    }
  } catch (error: any) {
    console.error("Error fetching work data:", error.message || error);
    throw new Error("Failed to fetch work data.");
  }
};
