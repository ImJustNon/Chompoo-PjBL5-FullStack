/*
  Warnings:

  - You are about to drop the column `qrcache_expire` on the `QRCache` table. All the data in the column will be lost.
  - Added the required column `expired_at` to the `QRCache` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QRCache` DROP COLUMN `qrcache_expire`,
    ADD COLUMN `expired_at` DATETIME(3) NOT NULL;
