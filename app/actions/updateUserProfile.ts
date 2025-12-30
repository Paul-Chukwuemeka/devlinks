"use server";
import { prisma } from "@/lib/prisma";
import { profileType } from "@/types/profile-type";

export default async function UpdateUser(id: string, data: profileType) {
  await prisma.user.update({
    where: { id },
    data: { ...data },
  });
  return "user profile updated";
}
