/*
  Warnings:

  - A unique constraint covering the columns `[qrcache_activity_id]` on the table `QRCache` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `QRCache_qrcache_activity_id_key` ON `QRCache`(`qrcache_activity_id`);

-- AddForeignKey
ALTER TABLE `QRCache` ADD CONSTRAINT `QRCache_qrcache_activity_id_fkey` FOREIGN KEY (`qrcache_activity_id`) REFERENCES `Activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
