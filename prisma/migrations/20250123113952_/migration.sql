/*
  Warnings:

  - A unique constraint covering the columns `[user_uuid]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Users_user_uuid_key` ON `Users`(`user_uuid`);
