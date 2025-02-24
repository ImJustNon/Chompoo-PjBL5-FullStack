-- CreateTable
CREATE TABLE `MorningCheckinData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_number_at_machine` VARCHAR(191) NOT NULL,
    `employee_name` VARCHAR(191) NOT NULL,
    `employee_number` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time_1` DATETIME(3) NOT NULL,
    `time_2` DATETIME(3) NOT NULL,
    `machine_number` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
