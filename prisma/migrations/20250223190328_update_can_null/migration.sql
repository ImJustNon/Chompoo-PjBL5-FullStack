-- AlterTable
ALTER TABLE `MorningCheckinData` MODIFY `employee_number_at_machine` VARCHAR(191) NULL,
    MODIFY `employee_name` VARCHAR(191) NULL,
    MODIFY `employee_number` VARCHAR(191) NULL,
    MODIFY `date` DATETIME(3) NULL,
    MODIFY `time_1` DATETIME(3) NULL,
    MODIFY `time_2` DATETIME(3) NULL,
    MODIFY `machine_number` VARCHAR(191) NULL,
    MODIFY `note` VARCHAR(191) NULL;
