"use server";
import { prisma } from "@/lib/prisma";
import { profileType } from "@/types/types";

export default async function UpdateUser(id: string, data: profileType) {
  try {
    await prisma.user.update({
      where: { id },
      data: { ...data },
    });
  } catch (error) {
    throw new Error(error as string);
  }
  return "user profile updated";
}
