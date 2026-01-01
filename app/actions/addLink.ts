"use server";
import { prisma } from "@/lib/prisma";
import { LinkType } from "@/types/types";

export async function addLink(
  id: string,
  link: LinkType,
  collectionId?: string
) {
  const res = await prisma.link.create({
    data: {
      ...link,
      collection: {
        connect: { id: collectionId }
      }
    }
  })
  return res;
}
