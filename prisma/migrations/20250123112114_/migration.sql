/*
  Warnings:

  - The required column `user_uuid` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `user_uuid` VARCHAR(191) NOT NULL;
