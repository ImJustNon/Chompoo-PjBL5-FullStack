/*
  Warnings:

  - Added the required column `qrcache_expire` to the `QRCache` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QRCache` ADD COLUMN `qrcache_expire` VARCHAR(191) NOT NULL;
