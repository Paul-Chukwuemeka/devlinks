"use server";
import { prisma } from "@/lib/prisma";

export async function reorderCollectionLinks(
  collectionId: string,
  linkIds: string[],
) {
  try {
    await prisma.$transaction(async (tx) => {
      // Step A: Offset
      for (let i = 0; i < linkIds.length; i++) {
        await tx.link.update({
          where: { id: linkIds[i] },
          data: { orderNum: i + 1000 },
        });
      }

      // Step B: Final
      for (let i = 0; i < linkIds.length; i++) {
        await tx.link.update({
          where: { id: linkIds[i] },
          data: { orderNum: i },
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to reorder collection links:", error);
    return { success: false, error: "Failed to update collection links order" };
  }
}
