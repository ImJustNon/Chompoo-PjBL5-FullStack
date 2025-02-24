/*
  Warnings:

  - Made the column `employee_number_at_machine` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_name` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_number` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time_1` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time_2` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `machine_number` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `MorningCheckinData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `MorningCheckinData` MODIFY `employee_number_at_machine` VARCHAR(191) NOT NULL,
    MODIFY `employee_name` VARCHAR(191) NOT NULL,
    MODIFY `employee_number` VARCHAR(191) NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `time_1` DATETIME(3) NOT NULL,
    MODIFY `time_2` DATETIME(3) NOT NULL,
    MODIFY `machine_number` VARCHAR(191) NOT NULL,
    MODIFY `note` VARCHAR(191) NOT NULL;
