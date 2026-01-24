"use server";
import { prisma } from "@/lib/prisma";

export async function addCollection(userId: string, title: string) {
  try {
    // 1. Ensure a Card exists for the user.
    // If not, create a default one.
    let card = await prisma.card.findFirst({
      where: { userId },
    });

    if (!card) {
      card = await prisma.card.create({
        data: {
          title: "My Collections",
          userId: userId,
        },
      });
    }

    // 2. Create the LinkCollection
    const collection = await prisma.linkCollection.create({
      data: {
        title: title,
        userId: userId,
        cardId: card.id,
      },
    });

    return { success: true, collection };
  } catch (error) {
    console.error("Failed to add collection:", error);
    return { success: false, error: "Failed to create collection" };
  }
}
