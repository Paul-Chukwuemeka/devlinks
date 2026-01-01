/*
  Warnings:

  - A unique constraint covering the columns `[collectionId,orderNum]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Link_collectionId_idx" ON "Link"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_collectionId_orderNum_key" ON "Link"("collectionId", "orderNum");
