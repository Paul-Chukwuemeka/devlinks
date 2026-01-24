"use server";
import { prisma } from "@/lib/prisma";

export default async function getUserInfo(id: string) {
  const data = await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      cards: {
        include: {
          collections: {
            include: {
              links: {
                orderBy: {
                  orderNum: "asc",
                },
              },
            },
            orderBy: {
              orderNum: "asc",
            },
          },
        },
      },
      links: {
        where: {
          collectionId: null, // Only fetch direct links separately if desired
        },
        orderBy: {
          orderNum: "asc",
        },
      },
    },
    omit: {
      createdAt: true,
      emailVerified: true,
      updatedAt: true,
    },
  });
  return data;
}
