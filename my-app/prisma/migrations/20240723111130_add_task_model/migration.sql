/*
  Warnings:

  - You are about to drop the column `description` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "description",
ALTER COLUMN "title" SET DATA TYPE TEXT;
