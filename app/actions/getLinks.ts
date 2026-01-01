"use server";
import { prisma } from "@/lib/prisma";

export async function getLinks(id: string) {
  const data = await prisma.link.findMany({
    where: {
      id: id,
    },
  });

  return data;
}
