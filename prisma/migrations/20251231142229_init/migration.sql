-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_collectionId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "collectionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "LinkCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
