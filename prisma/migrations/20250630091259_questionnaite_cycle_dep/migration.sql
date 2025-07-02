/*
  Warnings:

  - You are about to drop the column `cycleId` on the `Questionnaire` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Questionnaire" DROP CONSTRAINT "Questionnaire_cycleId_fkey";

-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "cycleId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSystemAdmin" BOOLEAN NOT NULL DEFAULT false;
