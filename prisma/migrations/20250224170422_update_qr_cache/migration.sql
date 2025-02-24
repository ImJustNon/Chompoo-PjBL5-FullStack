/*
  Warnings:

  - The primary key for the `QRCache` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `QRCache` DROP FOREIGN KEY `QRCache_qrcache_activity_id_fkey`;

-- DropForeignKey
ALTER TABLE `QRCache` DROP FOREIGN KEY `QRCache_qrcache_student_id_fkey`;

-- DropIndex
DROP INDEX `QRCache_qrcache_activity_id_key` ON `QRCache`;

-- AlterTable
ALTER TABLE `QRCache` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`qrcache_uuid`);

-- CreateTable
CREATE TABLE `_ActivitiesToQRCache` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ActivitiesToQRCache_AB_unique`(`A`, `B`),
    INDEX `_ActivitiesToQRCache_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_QRCacheToStudents` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_QRCacheToStudents_AB_unique`(`A`, `B`),
    INDEX `_QRCacheToStudents_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ActivitiesToQRCache` ADD CONSTRAINT `_ActivitiesToQRCache_A_fkey` FOREIGN KEY (`A`) REFERENCES `Activities`(`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActivitiesToQRCache` ADD CONSTRAINT `_ActivitiesToQRCache_B_fkey` FOREIGN KEY (`B`) REFERENCES `QRCache`(`qrcache_uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QRCacheToStudents` ADD CONSTRAINT `_QRCacheToStudents_A_fkey` FOREIGN KEY (`A`) REFERENCES `QRCache`(`qrcache_uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_QRCacheToStudents` ADD CONSTRAINT `_QRCacheToStudents_B_fkey` FOREIGN KEY (`B`) REFERENCES `Students`(`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
