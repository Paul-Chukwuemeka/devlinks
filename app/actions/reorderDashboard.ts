"use server";
import { prisma } from "@/lib/prisma";

export type ReorderItem = {
  id: string;
  type: "link" | "collection";
};

export async function reorderDashboard(items: ReorderItem[]) {
  try {
    await prisma.$transaction(async (tx) => {
      // Step A: Offset all items involved to avoid unique constraint collisions
      // (Assuming a high enough offset for the dashboard-level order)
      for (let i = 0; i < items.length; i++) {
        if (items[i].type === "link") {
          await tx.link.update({
            where: { id: items[i].id },
            data: { orderNum: i + 5000 },
          });
        } else {
          await tx.linkCollection.update({
            where: { id: items[i].id },
            data: { orderNum: i + 5000 },
          });
        }
      }

      // Step B: Set final correct orders
      for (let i = 0; i < items.length; i++) {
        if (items[i].type === "link") {
          await tx.link.update({
            where: { id: items[i].id },
            data: { orderNum: i },
          });
        } else {
          await tx.linkCollection.update({
            where: { id: items[i].id },
            data: { orderNum: i },
          });
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to reorder dashboard items:", error);
    return { success: false, error: "Failed to update dashboard order" };
  }
}
