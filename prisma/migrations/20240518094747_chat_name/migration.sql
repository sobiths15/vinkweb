/*
  Warnings:

  - You are about to drop the column `cname` on the `chat` table. All the data in the column will be lost.
  - Added the required column `chatName` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "cname",
ADD COLUMN     "chatName" TEXT NOT NULL;
