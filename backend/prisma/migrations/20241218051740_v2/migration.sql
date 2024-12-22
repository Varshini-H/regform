/*
  Warnings:

  - Added the required column `salary` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `salary` VARCHAR(191) NOT NULL;
