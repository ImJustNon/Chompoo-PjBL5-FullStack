/*
  Warnings:

  - You are about to drop the `StudentRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `StudentRoles` DROP FOREIGN KEY `StudentRoles_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `StudentRoles` DROP FOREIGN KEY `StudentRoles_student_id_fkey`;

-- DropTable
DROP TABLE `StudentRoles`;

-- CreateTable
CREATE TABLE `UserRoles` (
    `user_id` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
