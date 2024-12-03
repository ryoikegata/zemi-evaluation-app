import { Prisma, User } from "@prisma/client";
import { prisma } from "~/libs/dbconnect";
import { json, redirect } from "@remix-run/node";


export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("不明なエラーが発生しました");
  }
}

type CreateUserInput = {
  name: string;
  email: string;
  group_id: number;
  role_id: number;
  student_id: string;
}

export const createUser = async (data: CreateUserInput) => {
  try {
    await prisma.user.create({
      data: {
        email: data.email,
        password: 'password',
        name: data.name,
        student_id: data.student_id,
        role_id: data.role_id,
        group_id: data.group_id,
      }
    });
    return redirect('/users');
  } catch (error) {
    if (error instanceof Error) {
      return json({ errors: { _form: error.message } });
    }
    return json({ errors: { _form: "不明なエラーが発生しました" } });
  }
}