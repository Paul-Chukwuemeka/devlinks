-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "LinkCollection" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
