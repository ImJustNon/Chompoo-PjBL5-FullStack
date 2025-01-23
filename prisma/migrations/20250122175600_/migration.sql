/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Roles` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(191) NOT NULL,
    `role_description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentRoles` (
    `student_id` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`student_id`, `role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPrefix` (
    `prefix_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prefix_name` VARCHAR(10) NOT NULL,
    `prefix_name_short` VARCHAR(8) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`prefix_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` VARCHAR(15) NOT NULL,
    `user_prefix_id` INTEGER NOT NULL,
    `user_firstname` VARCHAR(50) NOT NULL,
    `user_lastname` VARCHAR(50) NOT NULL,
    `user_email` VARCHAR(50) NOT NULL,
    `user_phonenumber` VARCHAR(10) NOT NULL,
    `user_password` VARCHAR(20) NOT NULL,
    `is_student` BOOLEAN NOT NULL,
    `is_admin` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admins` (
    `admin_id` VARCHAR(191) NOT NULL,
    `admin_department_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Students` (
    `student_id` VARCHAR(191) NOT NULL,
    `student_year_admission` VARCHAR(4) NOT NULL,
    `student_department_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `department_id` VARCHAR(191) NOT NULL,
    `department_fullname_th` VARCHAR(191) NOT NULL,
    `department_fullname_en` VARCHAR(191) NOT NULL,
    `department_type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`department_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityType` (
    `activitytype_id` INTEGER NOT NULL,
    `activitytype_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`activitytype_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activities` (
    `activity_id` VARCHAR(191) NOT NULL,
    `activity_name` VARCHAR(50) NOT NULL,
    `activity_description` TEXT NULL,
    `activity_department_id` VARCHAR(191) NOT NULL,
    `activity_date` VARCHAR(20) NOT NULL,
    `activity_type_id` INTEGER NOT NULL,
    `activity_role_admin_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivitiesParticipated` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `activity_id` VARCHAR(191) NOT NULL,
    `activity_checked` BOOLEAN NOT NULL DEFAULT true,
    `activity_checked_late` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentRoles` ADD CONSTRAINT `StudentRoles_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentRoles` ADD CONSTRAINT `StudentRoles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_user_prefix_id_fkey` FOREIGN KEY (`user_prefix_id`) REFERENCES `UserPrefix`(`prefix_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admins` ADD CONSTRAINT `Admins_admin_department_id_fkey` FOREIGN KEY (`admin_department_id`) REFERENCES `Departments`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admins` ADD CONSTRAINT `Admins_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_student_department_id_fkey` FOREIGN KEY (`student_department_id`) REFERENCES `Departments`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Students` ADD CONSTRAINT `Students_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_activity_department_id_fkey` FOREIGN KEY (`activity_department_id`) REFERENCES `Departments`(`department_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_activity_type_id_fkey` FOREIGN KEY (`activity_type_id`) REFERENCES `ActivityType`(`activitytype_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_activity_role_admin_id_fkey` FOREIGN KEY (`activity_role_admin_id`) REFERENCES `Roles`(`role_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivitiesParticipated` ADD CONSTRAINT `ActivitiesParticipated_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivitiesParticipated` ADD CONSTRAINT `ActivitiesParticipated_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
