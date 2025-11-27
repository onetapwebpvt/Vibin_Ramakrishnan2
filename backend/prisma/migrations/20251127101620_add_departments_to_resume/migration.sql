/*
  Warnings:

  - Added the required column `departments` to the `ResumeProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeProfile" ADD COLUMN     "departments" TEXT NOT NULL;
