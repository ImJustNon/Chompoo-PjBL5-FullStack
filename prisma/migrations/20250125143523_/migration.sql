/*
  Warnings:

  - You are about to alter the column `activity_date` on the `Activities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Activities` MODIFY `activity_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ActivityType` MODIFY `activitytype_id` INTEGER NOT NULL;
