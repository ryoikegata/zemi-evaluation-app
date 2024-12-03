import { prisma } from "~/libs/dbconnect";

export const getAllGroups = async () => {
  try {
    const groups = await prisma.group.findMany();
    return groups;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("不明なエラーが発生しました");
  }
}