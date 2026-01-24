"use server";
import { prisma } from "@/lib/prisma";

export default async function getUserByUserName(username: string) {
  const data = await prisma.user.findFirst({
    where: {
      username: username,
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
          collectionId: null,
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
