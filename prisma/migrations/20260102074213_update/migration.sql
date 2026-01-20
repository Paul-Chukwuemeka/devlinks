/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "LinkCollection" DROP CONSTRAINT "LinkCollection_cardId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "LinkCollection";

-- CreateTable
CREATE TABLE "card" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_Collection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "orderNum" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "link_Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orderNum" INTEGER NOT NULL DEFAULT 0,
    "collectionId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "link_collectionId_idx" ON "link"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "link_collectionId_orderNum_key" ON "link"("collectionId", "orderNum");

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_Collection" ADD CONSTRAINT "link_Collection_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_Collection" ADD CONSTRAINT "link_Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "link_Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
