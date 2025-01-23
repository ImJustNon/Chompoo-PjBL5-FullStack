/*
  Warnings:

  - You are about to drop the column `qrcache_uuid_token` on the `QRCache` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qrcache_uuid]` on the table `QRCache` will be added. If there are existing duplicate values, this will fail.
  - The required column `qrcache_uuid` was added to the `QRCache` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `QRCache` DROP COLUMN `qrcache_uuid_token`,
    ADD COLUMN `qrcache_uuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `QRCache_qrcache_uuid_key` ON `QRCache`(`qrcache_uuid`);
