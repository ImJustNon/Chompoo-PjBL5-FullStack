-- CreateTable
CREATE TABLE `QRCache` (
    `qrcache_student_id` VARCHAR(191) NOT NULL,
    `qrcache_uuid_token` VARCHAR(36) NOT NULL,
    `qrcache_activity_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`qrcache_student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QRCache` ADD CONSTRAINT `QRCache_qrcache_student_id_fkey` FOREIGN KEY (`qrcache_student_id`) REFERENCES `Students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
