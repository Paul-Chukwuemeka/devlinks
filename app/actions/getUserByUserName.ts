"use server";
import { prisma } from "@/lib/prisma";

export default async function getUserByUserName(username: string) {
  const data = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      cards: true,
      links: true,
    },
    omit: {
      createdAt: true,
      emailVerified: true,
      updatedAt: true,
    },
  });
  return data;
}
