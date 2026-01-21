"use server";
import { prisma } from "@/lib/prisma";
import { CreateLinkInput } from "@/types/types";

export async function addLink(
  link: CreateLinkInput,
  userId?: string,
  collectionId?: string,
) {
  const data = collectionId
    ? {
        title: link.title,
        url: link.url,
        orderNum: link.orderNum,
        user: {
          connect: { id: userId },
        },
        collection: { connect: { id: collectionId } },
      }
    : {
        title: link.title,
        url: link.url,
        user: {
          connect: { id: userId },
        },
        orderNum: link.orderNum,
      };

  return prisma.link.create({ data });
}
