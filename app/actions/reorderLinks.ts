"use server";
import { prisma } from "@/lib/prisma";

export async function reorderLinks(linkIds: string[]) {
  try {
    // 1. We receive link IDs in the desired order
    // 2. We use a transaction to update each link's orderNum to avoid conflicts
    //    We'll use a two-step update to navigate the unique constraint on (collectionId, orderNum)

    await prisma.$transaction(async (tx) => {
      // Step A: Move everyone out of the way (temporary high numbers)
      for (let i = 0; i < linkIds.length; i++) {
        await tx.link.update({
          where: { id: linkIds[i] },
          data: { orderNum: i + 1000 }, // High offset to avoid collision
        });
      }

      // Step B: Set final correct orders
      for (let i = 0; i < linkIds.length; i++) {
        await tx.link.update({
          where: { id: linkIds[i] },
          data: { orderNum: i },
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to reorder links:", error);
    return { success: false, error: "Failed to update links order" };
  }
}
