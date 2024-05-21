/*
  Warnings:

  - Added the required column `cname` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "cname" TEXT NOT NULL;
