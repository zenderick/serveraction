"use server";

import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

import { ZodError } from "zod";
import { TodoZodSchema } from "../schema/todo.zod.schema";

import { auth } from "@clerk/nextjs";

interface CreateTodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (
  title: string
): Promise<CreateTodoResponse> => {
  const { userId }: { userId: string | null } = auth();

  if (!userId)
    return {
      success: false,
      message: "No user id (backend)",
    };

  try {
    TodoZodSchema.parse({
      title,
    });
    await prisma.todo.create({
      data: {
        title: title.trim(),
        userId: userId,
      },
    });
    revalidatePath("/todo");
    return {
      success: true,
      message: "Todo created (backend)",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    return {
      success: false,
      message: "error de servidor (backend)",
    };
  }
};
