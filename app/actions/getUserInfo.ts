"use server";
import { prisma } from "@/lib/prisma";

export default async function getUserInfo(id: string) {
  const data = await prisma.user.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      cards: true,
      links:true,
    },
    omit: {
      createdAt: true,
      emailVerified: true,
      updatedAt: true,
    },
  });
  return data;
}
