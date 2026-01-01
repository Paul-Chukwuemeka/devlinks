"use server";
import { prisma } from "@/lib/prisma";
import { CreateLinkInput } from "@/types/types";

export async function addLink(link: CreateLinkInput, collectionId?: string) {
  return prisma.link.create({
    data: {
      title: link.title,
      url: link.url,
      orderNum: link.orderNum ?? 0,
      ...(collectionId && { collectionId }),
    },
  });
}
